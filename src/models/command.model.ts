import { Execute } from "./execute.model";

export interface Command { 
    name: string;
    description?: string;
    aliases?: string[];
    execute: Execute;
}