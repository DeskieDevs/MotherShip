import { neutralColor, protossIcon } from "../../config.json"
import Discord from "discord.js"
import { Command } from "../../index"

const command: Command = {
    name: "test",
    description: "test bugs/issues",
    /**options: [
        {
            name: "Subject",
            description: "Please specify in detail the problem",
            type: "STRING"
        }
    ],*/
    async execute(interaction) {
        await interaction.reply({ content: "test" })
    }
}

export default command
