import {
SlashCommandBuilder
} from "discord.js";

import fs from "fs";

export const data =
new SlashCommandBuilder()

.setName(
"candidature-add"
)

.setDescription(
"Ajouter une candidature"
)

.addStringOption(option =>
option
.setName("nom")
.setDescription("Nom")
.setRequired(true)
)

.addStringOption(option =>
option
.setName("contenu")
.setDescription("Texte")
.setRequired(true)
);

export async function execute(interaction) {

const nom =
interaction.options
.getString("nom")
.toLowerCase();

const contenu =
interaction.options
.getString("contenu");

const data =
JSON.parse(
fs.readFileSync(
"./data/candidatures.json",
"utf8"
)
);

data[nom] = {

enabled: true,

content: contenu

};

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
`✅ Candidature ${nom} ajoutée.`,

ephemeral: true

});

}
