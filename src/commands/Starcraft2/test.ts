import { successColor } from "../../config.json"
import Discord from "discord.js"
import { Command } from "../../index"

const command: Command = {
    name: "test",
    description: "Test command",
    cooldown: 3,
    allowDM: true,
    async execute(interaction) {
        const embed = new Discord.MessageEmbed().setTitle("test").setColor(successColor as Discord.HexColorString)
        const row = new Discord.MessageActionRow().addComponents(
            new Discord.MessageButton().setLabel("test lable").setStyle("LINK").setURL("https://www.youtube.com/channel/UCemJ32n8k7rIpRdW89WKuSg")
        )
        await interaction.reply({ components: [row], embeds: [embed] })
    }
}

export default command
