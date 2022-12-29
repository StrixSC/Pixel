import { RegisterCommandsOptions } from '../typings/register-commands-options';
import { ApplicationCommandDataResolvable, Client, Collection, ClientEvents } from "discord.js";
import { readdirSync } from "fs";
import { join } from "path";
import { Command, Config } from "../typings";
import { Event } from "./event";
import glob from "glob";
import { promisify } from "util";

const globPromise = promisify(glob);

class ExtendedClient extends Client {
    public commands: Collection<string, Command> = new Collection();
    public aliases: Collection<string, Command> = new Collection();
    public config: Config;

    constructor(config: Config) {
        // TODO: CHANGE THE INTENT
        // RIGHTNOW: NO INTENT;
        super({ intents: [] });
        this.config = config;
        this.login(this.config.token);
        this.registerModules();
    }

    public async registerModules() {
        const slashCommands: ApplicationCommandDataResolvable[] = [];
        const commandsPath = join(__dirname, "..", 'commands');
        const commandFiles = readdirSync(commandsPath).filter(file => file.endsWith('.ts'));
        console.log(commandFiles);
        for (const file of commandFiles) {
            const { command } = await this.importFile(file);
            if (!command.name) return;
            this.commands.set(command.name, command);
            slashCommands.push(command);
        }

        if(this.config.deployCommands) {
            this.on('ready', async () => {
                await this.registerCommands({
                    commands: slashCommands,
                    guildId: this.config.guildId
                });

                console.log("Commands deployed!");
            })
        }

        const eventFiles = await globPromise(`${__dirname}/../events/*/*{.ts,.js}`);
        for (const file of eventFiles) {
            const event: Event<keyof ClientEvents> = await this.importFile(file);
            this.on(event.event, event.run);
        }
    }

    public async importFile(filePath: string) {
        return (await import(filePath))?.default;
    }

    public async registerCommands({ commands, guildId }: RegisterCommandsOptions) {
        if(guildId) {
            this.guilds.cache.get(guildId)?.commands.set(commands);
            console.log(`Registering commands to ${guildId}`);
        } else {
            this.application?.commands.set(commands);
        }
    }
}

export default ExtendedClient;