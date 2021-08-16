import dotenv from "dotenv"
dotenv.config()
import Discord from "discord.js"
import { HTBClient } from "./lib/extclient"
export const client = new HTBClient({
    intents: [
        Discord.Intents.FLAGS.GUILDS,
        Discord.Intents.FLAGS.GUILD_MEMBERS,
        Discord.Intents.FLAGS.GUILD_VOICE_STATES,
        Discord.Intents.FLAGS.GUILD_MESSAGES,
        Discord.Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
        Discord.Intents.FLAGS.DIRECT_MESSAGES,
        Discord.Intents.FLAGS.DIRECT_MESSAGE_REACTIONS
    ]
})
//Import commands and events
import { setup } from "./lib/imports"
setup(client)

//Command interface
export interface Command extends Discord.ApplicationCommandData {
    cooldown?: number
    allowDM?: true
    allowTip?: false
    dev?: true
    roleWhitelist?: Discord.Snowflake[]
    roleBlacklist?: Discord.Snowflake[]
    channelBlacklist?: Discord.Snowflake[]
    channelWhitelist?: Discord.Snowflake[]
    categoryWhitelist?: Discord.Snowflake[]
    categoryBlacklist?: Discord.Snowflake[]
    category?: string
    execute(interaction: Discord.CommandInteraction): Promise<any>
}

//Log in
client.login(process.env.DISCORD_TOKEN)
