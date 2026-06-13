import {
    SlashCommandBuilder,
    EmbedBuilder,
    ActionRowBuilder,
    StringSelectMenuBuilder
} from "discord.js";

export const data = new SlashCommandBuilder()
    .setName("setup-ticket")
    .setDescription("Créer le panel ticket");

export async function execute(interaction) {

    const embed = new EmbedBuilder()
        .setTitle("🎫 Support Nexoria RP")
        .setDescription(
`Bienvenue sur le support Nexoria RP.

Sélectionnez la catégorie correspondant à votre demande.`
        )
        .setColor("White");

    const menu = new StringSelectMenuBuilder()
        .setCustomId("ticket_menu")
        .setPlaceholder("Choisir une catégorie")
        .addOptions([
            {
                label: "Support Général",
                value: "support",
                emoji: "📋"
            },
            {
                label: "Entreprise",
                value: "entreprise",
                emoji: "🏢"
            },
            {
                label: "Recrutement Staff",
                value: "staff",
                emoji: "👮"
            },
            {
                label: "Mappeur",
                value: "mappeur",
                emoji: "🗺️"
            },
            {
                label: "Signalement Bug",
                value: "bug",
                emoji: "🐛"
            }
        ]);

    const row = new ActionRowBuilder()
        .addComponents(menu);

    await interaction.reply({
        content: "Panel envoyé.",
        ephemeral: true
    });

    await interaction.channel.send({
        embeds: [embed],
        components: [row]
    });
}