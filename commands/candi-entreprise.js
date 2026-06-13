import { SlashCommandBuilder } from "discord.js";
import fs from "fs";

export const data = new SlashCommandBuilder()
    .setName("candi-entreprise")
    .setDescription("Ouvrir ou fermer les candidatures entreprise")
    .addStringOption(option =>
        option
            .setName("etat")
            .setDescription("on ou off")
            .setRequired(true)
            .addChoices(
                { name: "on", value: "on" },
                { name: "off", value: "off" }
            )
    );

export async function execute(interaction) {

    const etat =
        interaction.options.getString(
            "etat"
        );

    const data =
        JSON.parse(
            fs.readFileSync(
                "./data/candidatures.json",
                "utf8"
            )
        );

    data.entreprise.enabled =
        etat === "on";

    fs.writeFileSync(
        "./data/candidatures.json",
        JSON.stringify(
            data,
            null,
            2
        )
    );

    await interaction.reply({
        content:
            `✅ Candidatures Entreprise ${etat.toUpperCase()}`,
        ephemeral: true
    });

}