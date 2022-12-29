import { InteractionResult } from './../typings/index';
import { SlashCommandBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder, ApplicationCommand, CacheType, Interaction } from "discord.js";
import axios from "axios";

export default {
    data: new SlashCommandBuilder()
        .setName("upcomming")
        .setDescription("View upcomming contests for specific sites.")
        .addStringOption(option =>
        option.setName('type')
            .setDescription('Chronos can categorize the contests by popularity of site')
            .setRequired(true)
            .addChoices(
                { name: 'Top10', value: 'resource_top10' },
                { name: 'CompetitiveProgramming', value: 'resource_cp' },
                { name: 'CTF', value: 'resource_ctf' },
            )),
    async execute(interaction: InteractionResult) {
        await interaction.followUp("Hello!");
    },
}