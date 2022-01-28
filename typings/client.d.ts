import { Collection } from "discord.js";
import { Node } from "lavaclient";

declare module "discord.js"{
    export interface Client{
        lavalink:Node,
        queue:Map<string,any>,
        commands:Collection<unknown, unknown>,
        aliases:Collection<unknown,unknown>,
        categories:string[],
        cooldowns:Collection<unknown,unknown>,
        interactions:Collection<unknown,unknown>,
    }
}