import { SlashCommandBuilder } from "discord.js";
import fs from "fs";

export const data = new SlashCommandBuilder()
    .setName("candi-mappeur")
    .setDescription("Ouvrir ou fermer les candidatures mappeur")
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

    data.mappeur.enabled =
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
            `✅ Candidatures Mappeur ${etat.toUpperCase()}`,
        ephemeral: true
    });

}