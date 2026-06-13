import dotenv from "dotenv";
dotenv.config();

import "./server.js";

import {
Client,
GatewayIntentBits
} from "discord.js";

import fs from "fs";

import { createTicket } from "./tickets/createTicket.js";
import { handleTicketAI } from "./tickets/ticketAI.js";
import { closeTicket } from "./tickets/closeTicket.js";

import {
updateTicketActivity,
getInactiveTickets
} from "./tickets/inactivityChecker.js";

console.log(
"TOKEN =",
process.env.TOKEN
? "✅ Chargé"
: "❌ Introuvable"
);

console.log(
"MISTRAL =",
process.env.MISTRAL_API_KEY
? "✅ Chargé"
: "❌ Introuvable"
);

const client = new Client({

intents: [

GatewayIntentBits.Guilds,
GatewayIntentBits.GuildMessages,
GatewayIntentBits.MessageContent

]

});

client.commands = new Map();

const commandFiles = fs

.readdirSync("./commands")

.filter(
file =>
file.endsWith(".js")
);

for (const file of commandFiles) {

const command =
await import(
`./commands/${file}`
);

client.commands.set(
command.data.name,
command
);

}

client.once(
"clientReady",
() => {

console.log(
`✅ ${client.user.tag} connecté`
);

setInterval(

async () => {

const inactive =
getInactiveTickets();

for (
const channelId
of inactive
) {

const channel =
client.channels.cache.get(
channelId
);

if (
channel
) {

await closeTicket(
channel
);

}

}

},

60 * 1000

);

}
);

client.on(
"interactionCreate",
async interaction => {

try {

// Slash Commands
if (
interaction.isChatInputCommand()
) {

const command =
client.commands.get(
interaction.commandName
);

if (!command)
return;

await command.execute(
interaction
);

}

// Menu Ticket
if (
interaction.isStringSelectMenu()
) {

if (
interaction.customId ===
"ticket_menu"
) {

await createTicket(
interaction
);

}

}

// Boutons
if (
interaction.isButton()
) {

// Fermer Ticket
if (
interaction.customId ===
"close_ticket"
) {

await interaction.reply({

content:
"🔒 Fermeture du ticket...",

ephemeral: true

});

await closeTicket(
interaction.channel
);

return;

}

// Candidature terminée
if (
interaction.customId ===
"candidature_ok"
) {

await interaction.update({

content:
`✅ Votre candidature a bien été envoyée.

<@&1512998210778431554> <@&1515350989409095881>

Un membre du staff va examiner votre demande.`,

components: []

});

return;

}

// Continuer modification
if (
interaction.customId ===
"candidature_edit"
) {

await interaction.reply({

content:
"✏️ Vous pouvez continuer à modifier votre candidature.",

ephemeral: true

});

return;

}

}

} catch (error) {

console.error(
"Erreur interaction :",
error
);

}

}
);

client.on(
"messageCreate",
async message => {

try {

if (
message.author.bot
)
return;

updateTicketActivity(
message.channel.id
);

await handleTicketAI(
message
);

} catch (error) {

console.error(
"Erreur messageCreate :",
error
);

}

}
);

client.login(
process.env.TOKEN
);
