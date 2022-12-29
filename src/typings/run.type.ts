import Client from "../chronos";

export interface Run {
    (client: Client, ...args: any[]): any
}