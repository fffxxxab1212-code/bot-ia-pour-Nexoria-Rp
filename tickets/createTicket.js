import {
ChannelType,
PermissionFlagsBits,
ActionRowBuilder,
ButtonBuilder,
ButtonStyle
} from "discord.js";

import fs from "fs";

const config = JSON.parse(
fs.readFileSync(
"./config.json",
"utf8"
)
);

export async function createTicket(interaction) {

await interaction.deferReply({
ephemeral: true
});

const category = interaction.values[0];

const existing =
interaction.guild.channels.cache.find(
c =>
c.name ===
`ticket-${interaction.user.username.toLowerCase()}`
);

if (existing) {

return interaction.editReply({
content:
"❌ Vous avez déjà un ticket ouvert."
});

}

const channel =
await interaction.guild.channels.create({

name:
`ticket-${interaction.user.username.toLowerCase()}`,

type:
ChannelType.GuildText,

parent:
config.ticketCategoryId,

permissionOverwrites: [

{
id:
interaction.guild.roles.everyone.id,

deny: [
PermissionFlagsBits.ViewChannel
]
},

{
id:
interaction.user.id,

allow: [
PermissionFlagsBits.ViewChannel,
PermissionFlagsBits.SendMessages,
PermissionFlagsBits.ReadMessageHistory
]
},

{
id:
config.supportRoleId,

allow: [
PermissionFlagsBits.ViewChannel,
PermissionFlagsBits.SendMessages,
PermissionFlagsBits.ReadMessageHistory
]
}

]

});

const row =
new ActionRowBuilder()

.addComponents(

new ButtonBuilder()

.setCustomId(
"close_ticket"
)

.setLabel(
"Fermer le ticket"
)

.setEmoji(
"🔒"
)

.setStyle(
ButtonStyle.Danger
)

);

await channel.send({

content:
`👋 Bonjour <@${interaction.user.id}>,

Je suis l'assistant officiel de Nexoria RP.

Je peux vous aider concernant :

• Les candidatures
• Les recrutements
• Les entreprises
• Les métiers
• Le règlement
• Les informations du serveur

Je suis limité uniquement au support de Nexoria RP.

Posez votre question.`,

components: [row]

});

await interaction.editReply({

content:
`✅ Ticket créé : ${channel}`

});

}
