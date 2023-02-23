import { EMOTE_URL_CDN, getEmotesWithSearchQuery } from "./../bttv/bttv";
import { SearchEmote } from "./../bttv/emote.model";
import {
  AutocompleteInteraction,
  CacheType,
  CommandInteraction,
  EmbedBuilder,
  Interaction,
  SlashCommandBuilder,
} from "discord.js";

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

  async execute(interaction: CommandInteraction) {
    let done = true;
    const value = interaction.options.data[0].value.toString();
    if (!value) {
      done = false;
    }
    if (value.toString().startsWith(EMOTE_URL_CDN)) {
      interaction.followUp(value as string);
    } else {
      const emotes = await getEmotesWithSearchQuery(value.toString());
      if (emotes.length != 0) {
        interaction.followUp(emotes[0].url);
      } else {
        done = false;
      }
    }

    if (!done) {
      return interaction.followUp({
        ephemeral: true,
        content: "Could not find the emote you were looking for...",
      });
    }
  },

  async autocomplete(interaction: AutocompleteInteraction<CacheType>) {
    try {
      const focusedValue = interaction.options.getFocused();
      if (focusedValue.length < 3) {
        return;
      }
      const emotes = (await getEmotesWithSearchQuery(
        interaction.options.getFocused()
      )) as SearchEmote[];
      const response = [];
      emotes.forEach((e) => {
        response.push({
          name: e.code,
          value: e.url,
        });
      });
      interaction.respond(response);
    } catch (e) {
      console.error(e);
    }
  },
};
