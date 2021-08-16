import { client, Command } from "../index"
import Discord from "discord.js"

client.on("interactionCreate", async interaction => {
    let command: Command | null = null
    if (!interaction.isCommand() || interaction.user.bot) return

    command = client.commands.get(interaction.commandName)!

    //Log if command is ran in DMs
    if (interaction.channel?.type === "DM") console.log(`${interaction.user.tag} used command ${interaction.commandName} in DMs`)

    //Return if user is not verified
    let allowed = true

    //Channel Blacklist and whitelist systems
    if (interaction.channel instanceof Discord.GuildChannel) {
        if (command.categoryBlacklist && command.categoryBlacklist.includes(interaction.channel!.parentId!)) allowed = false
        else if (command.channelBlacklist && command.channelBlacklist.includes(interaction.channelId)) allowed = false
        else if (command.categoryWhitelist && !command.categoryWhitelist.includes(interaction.channel!.parentId!)) allowed = false
        else if (command.channelWhitelist && !command.channelWhitelist.includes(interaction.channelId)) allowed = false
    }

    if (!client.cooldowns.has(command.name)) client.cooldowns.set(command.name, new Discord.Collection())
    //Run command and handle errors
    try {
        // Run the command
        await command.execute(interaction)

        let reply: Discord.Message | null = null
        if (!interaction.ephemeral && interaction.replied) reply = (await interaction.fetchReply()) as Discord.Message
    } catch (error) {
        console.error(
            `Unexpected error with command ${interaction.commandName} on channel ${
                interaction.channel instanceof Discord.GuildChannel ? interaction.channel.name : interaction.channel!.type
            } executed by ${interaction.user.tag}. Here's the error:\n${error.stack}`
        )
    }
})
