import ExtendedClient from "src/chronos";
import { ChatInputApplicationCommandData, CommandInteraction, CommandInteractionOptionResolver, GuildMember, PermissionResolvable } from "discord.js";

export interface ExtendedInteraction extends CommandInteraction {
    member: GuildMember;
}

interface RunOptions {
    client: ExtendedClient,
    interaction: ExtendedInteraction,
    args: CommandInteractionOptionResolver
}

type RunFunction = (options: RunOptions) => any;
type CommandOptions = {
    userPermissions?: PermissionResolvable[],
    cooldown: number,
    run: RunFunction;
}

export type CommandType = CommandOptions & ChatInputApplicationCommandData;