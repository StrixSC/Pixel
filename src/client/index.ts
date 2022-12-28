import { Client, Collection } from "discord.js";
import { readdirSync } from "fs";
import { join } from "path";
import { Command, Event, Config } from "../models";


class ExtendedClient extends Client {
    public commands: Collection<string, Command> = new Collection();
    public aliases: Collection<string, Command> = new Collection();
    public events: Collection<string, Event> = new Collection();
    private config!: Config;

    public async init(config: Config) {
        this.config = config;
        // Login to Discord
        this.login(this.config.token);

        // Connect to Database
        // ...

        // Commands:
        const commandsPath = join(__dirname, "..", "commands");
        readdirSync(commandsPath).forEach(async (dir) => {
            const commandsFiles = readdirSync(`${commandsPath}/${dir}`).filter((file) => file.endsWith('.ts'));
            for (const file of commandsFiles) {
                const { command } = await import(`${commandsPath}/${file}`)
                this.commands.set(command.name, command);
                if (command.aliases?.length == 0) {
                    for (const aliase of command.aliases) {
                        this.aliases.set(aliase, command);
                    }
                }
            }
        });

        // Events:
        const eventsPath = join(__dirname, "..", "events");
        readdirSync(eventsPath).forEach(async (dir) => {
            const eventsFiles = readdirSync(`${eventsPath}/${dir}`).filter((file) => file.endsWith('.ts'));
            for (const file of eventsFiles) {
                const { event } = await import(`${eventsPath}/${file}`)
                this.events.set(event.name, event.run);
                this.on(event.name, event.run.bind(null, this));
            }
        });
    }

}

export default ExtendedClient;