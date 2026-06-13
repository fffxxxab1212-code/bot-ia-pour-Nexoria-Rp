import dotenv from "dotenv";
dotenv.config();

import fs from "fs";

import {
    REST,
    Routes
} from "discord.js";

const commands = [];

const commandFiles = fs
    .readdirSync("./commands")
    .filter(file => file.endsWith(".js"));

for (const file of commandFiles) {

    const command =
        await import(`./commands/${file}`);

    commands.push(
        command.data.toJSON()
    );

}

const rest = new REST({
    version: "10"
}).setToken(
    process.env.TOKEN
);

try {

    console.log(
        "🔄 Déploiement des commandes..."
    );

    await rest.put(

        Routes.applicationGuildCommands(

            process.env.CLIENT_ID,
            process.env.GUILD_ID

        ),

        {
            body: commands
        }

    );

    console.log(
        "✅ Commandes enregistrées."
    );

} catch (error) {

    console.error(error);

}