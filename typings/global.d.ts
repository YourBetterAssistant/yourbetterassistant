import { Collection } from "discord.js";
import { Node } from "lavaclient";

module "discord.js" {
  export interface Client {
    lavalink: Node;
    queue: Map<string, any>;
    commands: Collection<unknown, command>;
    aliases: Collection<unknown, unknown>;
    categories: string[];
    cooldowns: Collection<unknown, any>;
    interactions: Collection<unknown, interaction>;
    Token: string;
    prefix: { [key: string]: string };
    cache: { id: string; prefix: string }[];
    api: any;
  }
}
module "config.json" {
  export const mongoPath: string;
  export const prefix: string;
  export const nodes: node[];
}
type interaction = {
  name: string;
  guild: boolean;
  description: string;
  permissions: boolean;
  options: {
    type: number;
    name: string;
    description: string;
    required?: boolean;
  }[];
  run: (client: Client, interaction: CommandInteraction) => void;
};
type node = {
  id: string;
  host: string;
  port: string;
  password: string;
};
type command = {
  name: string;
  description: string;
  aliases: string[];
  category: string;
  cooldown: number;
  memberpermissions: string;
  usage: string;
  run: (client: Client, message: Message, args: string[]) => void;
};
declare module "@felipebutcher/node-os-info" {
  type cpu = (cpu: number) => void;
  type mem = (memory: number) => void;
}
