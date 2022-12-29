import { CommandType } from './../typings/command.type';

export class Command { 
    constructor(commandOptions: CommandType) {
        Object.assign(this, commandOptions);
    }
}