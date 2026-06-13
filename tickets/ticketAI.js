import fs from "fs";

import {
ActionRowBuilder,
ButtonBuilder,
ButtonStyle
} from "discord.js";

import {
askMistral
} from "../ai/mistral.js";

import {
updateStaffActivity,
canAIReply
} from "./staffManager.js";

import {
ticketState
} from "./ticketState.js";

const config = JSON.parse(
fs.readFileSync(
"./config.json",
"utf8"
)
);

export async function handleTicketAI(message) {

try {

const candidatures = JSON.parse(
fs.readFileSync(
"./data/candidatures.json",
"utf8"
)
);

if (message.author.bot)
return;

if (
!message.channel.name.startsWith(
"ticket-"
)
)
return;

if (
message.member.roles.cache.has(
config.supportRoleId
)
) {

updateStaffActivity(
message.channel.id
);

return;

}

if (
!canAIReply(
message.channel.id
)
) {

return;

}

const content =
message.content.toLowerCase();

// ======================
// CANDIDATURE REMPLIE
// ======================

if (
content.includes("nom rp")
&&
content.includes("id nova-life")
) {

const row =
new ActionRowBuilder()

.addComponents(

new ButtonBuilder()

.setCustomId(
"candidature_ok"
)

.setLabel(
"✅ J'ai terminé"
)

.setStyle(
ButtonStyle.Success
),

new ButtonBuilder()

.setCustomId(
"candidature_edit"
)

.setLabel(
"✏️ Je continue"
)

.setStyle(
ButtonStyle.Secondary
)

);

await message.channel.send({

content:
"📋 Avez-vous terminé votre candidature ?",

components: [row]

});

return;

}

// ======================
// MAPPEUR
// ======================

if (
content.includes("mappeur")
) {

if (
ticketState[
message.channel.id
]?.mappeurSent
) {
return;
}

if (
!candidatures.mappeur.enabled
) {

await message.channel.send(
"❌ Les candidatures Mappeur sont actuellement fermées."
);

return;

}

ticketState[
message.channel.id
] = {

...ticketState[
message.channel.id
],

mappeurSent: true

};

await message.channel.send(
`🗺️ Candidature Mappeur - Nexoria RP\n\n${candidatures.mappeur.url}`
);

return;

}

// ======================
// ENTREPRISE
// ======================

if (
content.includes("entreprise")
) {

if (
ticketState[
message.channel.id
]?.entrepriseSent
) {
return;
}

if (
!candidatures.entreprise.enabled
) {

await message.channel.send(
"❌ Les candidatures Entreprise sont actuellement fermées."
);

return;

}

ticketState[
message.channel.id
] = {

...ticketState[
message.channel.id
],

entrepriseSent: true

};

await message.channel.send(
candidatures.entreprise.content
);

return;

}

// ======================
// STAFF
// ======================

if (
content.includes("staff")
) {

if (
ticketState[
message.channel.id
]?.staffSent
) {
return;
}

if (
!candidatures.staff.enabled
) {

await message.channel.send(
"❌ Les recrutements Staff sont actuellement fermés."
);

return;

}

ticketState[
message.channel.id
] = {

...ticketState[
message.channel.id
],

staffSent: true

};

await message.channel.send(
candidatures.staff.content
);

return;

}

// ======================
// IA
// ======================

const response =
await askMistral(
message.content
);

if (!response)
return;

await message.channel.send({

content:
response

});

} catch (error) {

console.error(
"Erreur TicketAI :",
error
);

}

}
