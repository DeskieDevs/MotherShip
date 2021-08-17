import { neutralColor, protossIcon, errorColor, channels } from "../../config.json"
import Discord, { MessageActionRow, MessageButton, MessageEmbed, TextChannel } from "discord.js"
import { Command } from "../../index"

const command: Command = {
    name: "report",
    description: "report bugs/issues",
    cooldown: 1000 * 60 * 15,
    options: [
        {
            name: "subject",
            type: "STRING",
            description: "What is the problem about?",
            required: true
        },
        {
            name: "details",
            type: "STRING",
            description: "Explain in detail what the bug/issue is.",
            required: true
        }
    ],
    async execute(interaction) {
        const subject = interaction.options.getString("subject")?.toString()
        const details = interaction.options.getString("details")?.toString()
        const channel = interaction.guild?.channels.cache.get(channels["bug-reports"]) // reports channel
        let textchannel = <TextChannel>channel
        if (!textchannel) {
            const errorEmbed = new MessageEmbed()
                .setTitle("Error")
                .setColor(errorColor as Discord.HexColorString)
                .setDescription("Something went wrong.\nReport this directly to the dev team.")
                .setFooter(`Use \`/credits\` to get in contact with developers.`)

            return await interaction.reply({ embeds: [errorEmbed], ephemeral: true })
        }

        const embed = new MessageEmbed()
            .setAuthor(`Sent from ${interaction.user.tag}`, interaction.user.displayAvatarURL())
            .setTitle(`Subject: ${subject}`)
            .setDescription(`**Details:**\n${details}`)
            .setTimestamp(Date.now())

        await textchannel.send({ embeds: [embed] })
        const responseEmbed = new MessageEmbed()
            .setDescription(`Report has been sent off to the Dev team.\nWe will respond as soon as we can.`)
            .setTimestamp(Date.now())
            .setFooter(`Made with ❤️ by Academy`, protossIcon)

        return await interaction.reply({ embeds: [responseEmbed], ephemeral: true })
    }
}

export default command
