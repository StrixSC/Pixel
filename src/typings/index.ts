import { ChatInputCommandInteraction, CacheType, MessageContextMenuCommandInteraction, UserContextMenuCommandInteraction } from "discord.js";

export { Config } from "./config.type";
export { Command } from "./command.type";

export type InteractionResult = ChatInputCommandInteraction<CacheType> |
    MessageContextMenuCommandInteraction<CacheType> |
    UserContextMenuCommandInteraction