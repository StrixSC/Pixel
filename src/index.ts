import Client from "./chronos";
import { Config } from "./typings"
import * as dotenv from "dotenv";
import { parse } from 'ts-command-line-args';

dotenv.config();

const { deployCommands } = parse({
    deployCommands: Boolean
});


const { BOT_TOKEN, BOT_PREFIX, PERMISSION_INTEGER } = process.env

if (!BOT_TOKEN) {
    console.error("MISSING BOT TOKEN!!!");
    process.exit(-1);
}

const config: Config = {
    token: BOT_TOKEN,
    prefix: BOT_PREFIX,
    permission_integer: Number(PERMISSION_INTEGER),
    deployCommands
}

export const client = new Client(config);
client.registerModules();