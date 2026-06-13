import {
    SlashCommandBuilder
} from "discord.js";

import fs from "fs";

export const data =
new SlashCommandBuilder()

.setName("knowledge-add")

.setDescription(
    "Ajouter une réponse"
)

.addStringOption(option =>
    option
        .setName("question")
        .setDescription("Question")
        .setRequired(true)
)

.addStringOption(option =>
    option
        .setName("reponse")
        .setDescription("Réponse")
        .setRequired(true)
);

export async function execute(interaction) {

    const question =
    interaction.options.getString(
        "question"
    );

    const answer =
    interaction.options.getString(
        "reponse"
    );

    const knowledge =
    JSON.parse(
        fs.readFileSync(
            "./data/knowledge.json"
        )
    );

    knowledge.push({
        question,
        answer
    });

    fs.writeFileSync(
        "./data/knowledge.json",
        JSON.stringify(
            knowledge,
            null,
            2
        )
    );

    await interaction.reply({
        content:
        "✅ Réponse ajoutée.",
        ephemeral: true
    });

}