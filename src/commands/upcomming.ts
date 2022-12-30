import { getUpcommingContests } from './../chronos/clist';
import { InteractionResult } from './../typings/index';
import { SlashCommandBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder, ApplicationCommand, CacheType, Interaction } from "discord.js";
import axios from "axios";

export default {
    data: new SlashCommandBuilder()
        .setName("upcomming")
        .setDescription("View upcomming contests for specific sites."),
        
    async execute(interaction: InteractionResult) {
        try {
            const contests = await getUpcommingContests();
            interaction.followUp("Hello!");
            console.log(contests.length);
            for(const contest of contests) {
                console.log(contest.event, contest.start);
            }
        } catch (e) {
            console.error(e);
            interaction.followUp("Hello!");
        }

    },
}