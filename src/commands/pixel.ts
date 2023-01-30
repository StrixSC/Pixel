import { InteractionResult } from "../typings/index";
import { SlashCommandBuilder } from "discord.js";
import { getTrendingEmotes } from "../bttv/bttv";
import Emote from "../bttv/emote.model";

export default {
  data: new SlashCommandBuilder()
    .setName("pixel")
    .setDescription("Find an image you're looking for")
    .addStringOption((option) =>
      option
        .setName("query")
        .setDescription(`Pixel gifs/images/emotes/emojis matching...`)
        .setAutocomplete(true)
    ),

  async execute(interaction: any) {},

  async autocomplete(interaction: any) {
    try {
      const emotes = (await getTrendingEmotes()) as Emote[];
      const response = [];
      emotes.forEach((e) => {
        response.push({
          name: e.code,
          value: e.url,
        });
      });
      await interaction.respond(response);
    } catch (e) {
      console.error(e);
    }
  },
};
