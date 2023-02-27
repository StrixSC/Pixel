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
    )
    .addStringOption((option) =>
      option
        .setRequired(false)
        .setName("size")
        .setDescription("Size of the image")
        .addChoices({ name: "Small", value: "1x" })
        .addChoices({ name: "Medium", value: "2x" })
        .addChoices({ name: "Large", value: "3x" })
    ),

  async execute(interaction: CommandInteraction) {
    const value = interaction.options.data[0].value.toString();

    if (!value) {
      return interaction.followUp({
        ephemeral: true,
        content: "Failed to provide a query...",
      });
    }

    if (value.length <= 3) {
      return interaction.followUp({
        ephemeral: true,
        content: "Query must be at least four characters long.",
      });
    }

    let sizeOption = interaction.options.get("size");
    let size = "2x";

    if (sizeOption) {
      size = sizeOption.value.toString();
    }

    if (value.toString().startsWith(EMOTE_URL_CDN)) {
      interaction.followUp(value as string);
    } else {
      const emotes = await getEmotesWithSearchQuery(value.toString(), size);
      if (emotes.length != 0) {
        return interaction.followUp(emotes[0].url);
      } else {
        return interaction.followUp({
          ephemeral: true,
          content: "Could not find anything using the given query...",
        });
      }
    }
  },

  async autocomplete(interaction: AutocompleteInteraction<CacheType>) {
    try {
      const focusedValue = interaction.options.getFocused();
      if (focusedValue.length < 3) {
        return;
      }

      const emotes = (await getEmotesWithSearchQuery(
        interaction.options.getFocused(),
        "2x"
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
