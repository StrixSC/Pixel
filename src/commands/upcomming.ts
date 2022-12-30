import { getUpcommingContests } from './../chronos/clist';
import { InteractionResult } from './../typings/index';
import { SlashCommandBuilder, EmbedBuilder } from "discord.js";

export default {
    data: new SlashCommandBuilder()
        .setName("upcomming")
        .setDescription("View upcomming contests for specific sites.")
        .addNumberOption(option => 
            option.setName("days")
            .setDescription("How many days to check for upcomming contests. Defaults to 7 days.")
            .setMinValue(1)
        )
        .addNumberOption(option => 
            option.setName("limit")
            .setDescription("Maximum amount of events to display. Maximum 10")
            .setMinValue(1)
            .setMaxValue(10)
        ),
        
    async execute(interaction: InteractionResult) {
        try {
            const days = interaction.options.get('days');
            const limit = interaction.options.get('limit');

            let dayValue = days ? days.value as number : null ; // getUpcommingContests will set the default value
            let limitValue = limit ? limit.value as number : null; 

            const contests = await getUpcommingContests(dayValue, limitValue);
            const embeds = [];
            for(const contest of contests) {
                let duration = "";
                const days = Math.floor(Number(contest.duration)/86400);
                const hours = Math.floor(Number(contest.duration)/3600 - (days * 24));
                if (!days) {
                    duration += `${hours} Hours`;
                } else {
                    duration += `${days} Days`;
                    if (hours) {
                        duration += ` ${hours} Hours`
                    }
                }
                const embed = new EmbedBuilder()
                .setColor('Random')
                .setTitle(`${contest.event} | ${contest.host}`)
                .setURL(contest.href)
                .setFooter({
                    text:`🕛 ${new Date(contest.start).toLocaleString()}  |  ⏳ ${duration} |  📌 ${contest.host}`
                })
                embeds.push(embed);
            }
            interaction.followUp({ 
                embeds: embeds,
                ephemeral: true
            });
        } catch (e) {
            console.error(e);
            interaction.followUp("Oops... Something seemes to have happened to Chronos for a brief period of time. Please try again later! 😭")
        }

    },
}