import { Message } from "discord.js";
import Client from '../chronos';

export interface Execute {
    (client: Client, message: Message, args: string[]): any;
}