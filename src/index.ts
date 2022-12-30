import ExtendedClient from "./chronos";
import { Config } from "./typings"
import * as dotenv from "dotenv";
import { parse, ArgumentConfig } from 'ts-command-line-args';

dotenv.config();

interface CLIArgs { 
    deployCommands: boolean;
}

const { deployCommands } = parse<CLIArgs>({
    deployCommands: { type: Boolean, optional: true }
})


const { BOT_TOKEN, BOT_PREFIX, PERMISSION_INTEGER, BOT_CLIENT_ID, GUILD_ID } = process.env

if (!BOT_TOKEN) {
    console.error("MISSING BOT TOKEN!!!");
    process.exit(-1);
}

const config: Config = {
    token: BOT_TOKEN,
    prefix: BOT_PREFIX,
    permission_integer: Number(PERMISSION_INTEGER),
    deployCommands,
    guildId: GUILD_ID,
    clientId: BOT_CLIENT_ID
}

const client = new ExtendedClient(config);

export default client;