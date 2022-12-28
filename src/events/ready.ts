import { Client, Events } from "discord.js";

const ReadyEvent = {
	name: Events.ClientReady,
	run(client: Client) {
		console.log(`Ready! Logged in as ${client.user?.tag}`);
	},
}

export default ReadyEvent;