import { Run } from './run.type';
import { ClientEvents, ShardEvents } from "discord.js";

type DiscordEvent = ClientEvents | ShardEvents;
export interface Event {
    name: string | keyof DiscordEvent
    run: Run
}