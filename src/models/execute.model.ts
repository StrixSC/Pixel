import { Message } from "discord.js";
import Client from '../client';

export interface Execute {
    (client: Client, message: Message, args: string[]): any;
}