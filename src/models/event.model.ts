import { Run } from './run.model';
import { ClientEvents } from "discord.js";

export interface Event {
    name: keyof ClientEvents;
    run: Run
}