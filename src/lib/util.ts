//This file contains a bunch of functions used across the bot on multuple commands.
import Discord from "discord.js"

export function updateButtonColors(row: Discord.MessageActionRow, page: number, pages: any[]) {
    if (page == 0) {
        row.components.forEach(button => {
            if (button.customId === "first" || button.customId === "previous") (button as Discord.MessageButton).setStyle("SECONDARY").setDisabled(true)
            else (button as Discord.MessageButton).setStyle("SUCCESS").setDisabled(false)
        })
    } else if (page == pages.length - 1) {
        row.components.forEach(button => {
            if (button.customId === "last" || button.customId === "next") (button as Discord.MessageButton).setStyle("SECONDARY").setDisabled(true)
            else (button as Discord.MessageButton).setStyle("SUCCESS").setDisabled(false)
        })
    } else {
        row.components.forEach(button => (button as Discord.MessageButton).setStyle("SUCCESS").setDisabled(false))
    }
    return row
}
export interface EventDb {
    name: "event"
    ids: Discord.Snowflake[]
}
