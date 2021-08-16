import Discord from "discord.js"
import { Command } from "../index"

export class HTBClient extends Discord.Client {
    commands: Discord.Collection<string, Command> = new Discord.Collection()
    cooldowns: Discord.Collection<Discord.Snowflake, number> = new Discord.Collection()
}
