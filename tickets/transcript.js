import fs from "fs";

export async function saveTranscript(channel) {

    const messages =
        await channel.messages.fetch({
            limit: 100
        });

    const sorted =
        [...messages.values()]
        .reverse();

    let transcript = "";

    for (const msg of sorted) {

        transcript +=
            `[${msg.createdAt.toLocaleString()}] ${msg.author.tag}: ${msg.content}\n`;

    }

    const fileName =
        `./transcripts/${channel.id}.txt`;

    if (!fs.existsSync("./transcripts")) {

        fs.mkdirSync("./transcripts");

    }

    fs.writeFileSync(
        fileName,
        transcript
    );

    return fileName;

}