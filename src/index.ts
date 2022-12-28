import Client from "./client";
import { Config } from "./models"
import * as dotenv from "dotenv";

dotenv.config();

const { BOT_TOKEN, BOT_PREFIX } = process.env

if (!BOT_TOKEN) {
    console.error("MISSING BOT TOKEN!!!");
    process.exit(-1);
}

const config: Config = {
    token: BOT_TOKEN,
    prefix: BOT_PREFIX
}

export const client = new Client({ intents: [] }).init(config)