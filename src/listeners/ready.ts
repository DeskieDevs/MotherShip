import { client, Command } from "../index"
import Discord from "discord.js"
import { isEqual } from "lodash"

client.once("ready", async () => {
    console.log(`Logged in as ${client.user!.tag}!`)

    //Only update global commands in production
    const globalCommands = await client.application!.commands.fetch()
    client.commands
        .filter(c => !!c.allowDM)
        .forEach(async command => {
            if (!globalCommands) await publishCommand(command)
            else {
                const discordCommand = globalCommands.find(c => c.name === command.name)!
                //Check if the command is published
                if (!globalCommands.some(cmd => cmd.name === command.name)) await publishCommand(command)
                else if (!commandEquals(discordCommand, command)) {
                    await discordCommand.edit(convertToDiscordCommand(command))
                    console.log(`Edited command ${command.name} since changes were found\n`, discordCommand, command)
                }
            }
        })
    //Delete commands that have been removed locally
    globalCommands.forEach(async command => {
        if (!client.commands.get(command.name)) {
            await command.delete()
            console.log(`Deleted command ${command.name} as it was deleted locally.`)
        } else if (!client.commands.get(command.name)?.allowDM) {
            await command.delete()
            console.log(`Deleted command ${command.name} globally as it is no longer allowed in DMs`)
        }
    })

    //Set guild commands - these don't need checks since they update instantly
    client.guilds.cache
        .get("874799781766111234")!
        .commands.set(constructDiscordCommands())
        .then(commands => commands.forEach(async command => await setPermissions(command)))
})

async function publishCommand(command: Command) {
    const cmd = await client.application!.commands.create(convertToDiscordCommand(command))
    await setPermissions(cmd)
    console.log(`Published command ${command.name}!`)
}

async function setPermissions(command: Discord.ApplicationCommand<{ guild: Discord.GuildResolvable }>) {
    const permissions: Discord.ApplicationCommandPermissionData[] = [],
        clientCmd = client.commands.get(command.name)!
    if (clientCmd.dev)
        permissions.push({
            type: "ROLE",
            id: "876870800689475594", //Discord Staff
            permission: true
        })
    else {
        clientCmd.roleWhitelist?.forEach(id => {
            //Add whitelisted roles
            permissions.push({
                type: "ROLE",
                id,
                permission: true
            })
        })
        clientCmd.roleBlacklist?.forEach(id => {
            //Add blacklisted roles
            permissions.push({
                type: "ROLE",
                id,
                permission: false
            })
        })
    }
    if (permissions.length) await command.permissions.set({ permissions, guild: "549503328472530974" })
}

function constructDiscordCommands() {
    const returnCommands: Discord.ApplicationCommandData[] = []
    let clientCommands = client.commands
    clientCommands = clientCommands.filter(cmd => !cmd.allowDM)
    clientCommands.forEach(c => returnCommands.push(convertToDiscordCommand(c)))

    return returnCommands
}

function convertToDiscordCommand(command: Command): Discord.ChatInputApplicationCommandData {
    return {
        name: command.name,
        description: command.description,
        defaultPermission: command.roleWhitelist || command.dev ? false : true,
        options: command.options
    }
}

const commandEquals = (discordCommand: Discord.ApplicationCommand, localCommand: Command) =>
    discordCommand.name === localCommand.name &&
    discordCommand.description === localCommand.description &&
    isEqual(discordCommand.options, localCommand.options?.map(o => transformOption(o)) ?? [])

function transformOption(option: Discord.ApplicationCommandOptionData): Discord.ApplicationCommandOptionData {
    return {
        type: option.type,
        name: option.name,
        description: option.description,
        required: option.type === "SUB_COMMAND" || option.type === "SUB_COMMAND_GROUP" ? option.required : option.required ?? false,
        choices: option.type === "STRING" || option.type === "NUMBER" || option.type === "INTEGER" ? option.choices : undefined,
        options:
            (option.type === "SUB_COMMAND" || option.type === "SUB_COMMAND_GROUP") && option.options ? option.options?.map(o => transformOption(o)) : undefined
    } as Discord.ApplicationCommandOptionData
}
