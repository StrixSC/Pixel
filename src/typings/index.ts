import { CListUrls } from './clist-urls.enum';
import { ChatInputCommandInteraction, CacheType, MessageContextMenuCommandInteraction, UserContextMenuCommandInteraction } from "discord.js";

export { Config } from "./config.type";
export { Command } from "./command.type";
export { CListUrls } from "./clist-urls.enum";
export { Contest, ContestRequestOptions, } from "./contest.type"
export { Resource, ResourceRequest, ResourceRequestOptions, } from "./resource.type"
export { CListRequest } from "./clist-request.type";

export type InteractionResult = ChatInputCommandInteraction<CacheType> |
    MessageContextMenuCommandInteraction<CacheType> |
    UserContextMenuCommandInteraction