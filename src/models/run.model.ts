import Client from "../client";

export interface Run {
    (client: Client, ...args: any[]): any
}