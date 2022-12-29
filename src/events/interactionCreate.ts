import { Event, } from "../chronos/event";
import client from ".."

export default new Event('interactionCreate', async (interaction) => {
    if (interaction.isCommand()) {
        await interaction.deferReply();
        const command = client.commands.get(interaction.commandName);
        if(!command) return interaction.followUp("You have used a non existant command");

        console.log(`Received command: ${command.name}`);
        command.execute(interaction)
    }
})