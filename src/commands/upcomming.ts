import { Command } from "../chronos/command";

export default new Command({
    name: "upcomming",
    description: "View upcomming events",
    cooldown: 10,
    run: async({ interaction }) => {
        interaction.followUp("Hello!")
    }
})