import { RegisterCommandsOptions } from '../typings/register-commands-options';
import { ApplicationCommandDataResolvable, Client, Collection, ClientEvents, REST, Routes } from "discord.js";
import { readdirSync } from "fs";
import { join } from "path";
import { Command, Config } from "../typings";
import { Event } from "./event";

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
        const commandPath = join(__dirname, "..", "commands");
        const commandFiles = readdirSync(commandPath).filter(file => file.endsWith('.ts'));
        for (const file of commandFiles) {
            const command = await this.importFile(join(commandPath, file));
            if (!command.name) return;
            this.commands.set(command.name, command);
            slashCommands.push(command);
        }

        if (this.config.deployCommands) {
            await this.registerCommands({
                commands: slashCommands,
                guildId: this.config.guildId
            });
        }

        const eventPath = join(__dirname, "..", "events");
        const eventFiles = readdirSync(eventPath).filter(file => file.endsWith('.ts'));
        for (const file of eventFiles) {
            const event: Event<keyof ClientEvents> = await this.importFile(join(eventPath, file));
            this.on(event.event, event.run);
        }
    }

    public async importFile(filePath: string): Promise<any> {
        const module = (await import(filePath)).default;
        return module;
    }

    public async registerCommands({ commands, guildId }: RegisterCommandsOptions) {
        const rest = new REST({ version: '10' }).setToken(this.config.token);
        (async () => {
            try {
                console.log(`Started refreshing ${commands.length} application (/) commands.`);
                let data: any;
                if (guildId) {
                    data = await rest.put(
                        Routes.applicationGuildCommands(this.config.clientId, guildId),
                        { body: commands },
                    );
                } else {
                    data = await rest.put(
                        Routes.applicationCommands(this.config.clientId),
                        { body: commands },
                    );
                }

                console.log(`Successfully reloaded ${data.length} application (/) commands.`);
            } catch (error) {
                console.error(error);
            }
        })();
    }
}

export default ExtendedClient;