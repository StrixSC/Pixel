import { Client } from "discord.js";
import * as dotenv from "dotenv";
dotenv.config()

const { BOT_TOKEN } = process.env;

const client = new Client({
    intents: []
});

try {
    client.login(BOT_TOKEN);
} catch (e) {
    console.error(e);
    process.exit(-1);
}

client.on("ready", async () => {
    await registerCommands();
});

const registerCommands = async () => {
    await client.application?.commands.set([
        {
            "name": "upcomming",
            "description": "Obtain a list of upcomming competitions",
        }
    ])
}