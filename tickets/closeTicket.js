import fs from "fs";

import {
saveTranscript
} from "./transcript.js";

const config = JSON.parse(
fs.readFileSync(
"./config.json",
"utf8"
)
);

export async function closeTicket(channel) {

try {

const transcript =
await saveTranscript(
channel
);

const logs =
await channel.guild.channels.fetch(
config.ticketLogsChannelId
);

if (logs) {

await logs.send({

content:
`📁 Transcript du ticket ${channel.name}`,

files: [
transcript
]

});

}

await channel.delete();

} catch (error) {

console.error(
"Erreur CloseTicket :",
error
);

}

}
