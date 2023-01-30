import { CacheType, Interaction, SlashCommandBuilder } from 'discord.js';
export type Command = SlashCommandBuilder & {
  execute: (interaction: Interaction<CacheType>) => any;
  autocomplete: (interaction: Interaction<CacheType>) => any;
};