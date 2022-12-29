import { CommandInteractionOptionResolver } from 'discord.js';
import { Event, } from "../chronos/event";
import { client } from ".."
import { ExtendedInteraction } from "../typings/command.type"

export default new Event('interactionCreate', async (interaction) => {
    console.log("Interaction created!", interaction);
    if (interaction.isCommand()) {
        await interaction.deferReply();
        const command = client.commands.get(interaction.commandName);
        if(!command) return interaction.followUp("You have used a non existant command");

        command.run({
            args: interaction.options as CommandInteractionOptionResolver,
            client,
            interaction: interaction as ExtendedInteraction
        })
    }
})