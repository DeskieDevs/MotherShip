import { neutralColor, protossIcon } from "../../config.json"
import Discord from "discord.js"
import { Command } from "../../index"

const command: Command = {
    name: "credits",
    description: "Credits of the bot maker",
    cooldown: 1000 * 60,
    allowDM: true,
    async execute(interaction) {
        const embed = new Discord.MessageEmbed()
            .setColor(neutralColor as Discord.HexColorString)
            .setTitle(`Mothership was made and is maintained by Academy#0001`)
            .setThumbnail(protossIcon)
            .setDescription(
                "Hello! My name is Elliot i'm from Sweden and I enjoy playing Starcraft II aswell as solving complicated coding problems. I've made several discord bots in the past aswell as other personal projects of mine. Mothership was inspired by Starcraft II. That's all I have to say, hope you enjoy the bot as much as I did making it ❤️"
            )
            .setTimestamp(Date.now())
            .setFields(
                {
                    name: "Technologies",
                    value: "MotherShip was made using TypeScript with [Discord.js](https://discord.js.org/#/)\n Github Repository: https://github.com/DeskieDevs/MotherShip\n"
                },
                {
                    name: "Bugs & Issues",
                    value: "If you experience any bugs & or issues please do /report <subject>"
                },
                {
                    name: "Contact",
                    value: "You can contact me through twitter or discord."
                }
            )
            .setFooter("Made with ❤️ by Academy", protossIcon)
        const row = new Discord.MessageActionRow().addComponents(
            new Discord.MessageButton().setLabel("Youtube").setStyle("LINK").setURL("https://www.youtube.com/channel/UCemJ32n8k7rIpRdW89WKuSg"),
            new Discord.MessageButton().setLabel("Github").setStyle("LINK").setURL("https://github.com/DeskieDevs/"),
            new Discord.MessageButton().setLabel("Twitter").setStyle("LINK").setURL("https://twitter.com/academy_sc2")
        )
        await interaction.reply({ components: [row], embeds: [embed], ephemeral: false })
    }
}

export default command
