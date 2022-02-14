import { Client } from "discord.js";
import commandPrefixSchema from "../Schemas/prefixSchema";
const cache: { id: string; prefix: string }[] = [];
export async function prefixLoad(
  client: Client,
  guildPrefixes: { [key: string]: string | undefined },
  globalPrefix: string
) {
  client.cache = cache;
  try {
    /**
     * @param client
     * The Client
     * */

    for (const guild of client.guilds.cache) {
      let guildID = guild[1].id;
      console.log(guildID);
      console.log(cache.length);
      if (cache.length !== 0 && cache.length === client.guilds.cache.size) {
        console.log("cache");
        let c = cache.find((c) => c.id == guildID);
        guildPrefixes[guildID] = c?.prefix;
      } else {
        console.log("new info");
        const result = await commandPrefixSchema.findOne({ _id: guildID });
        if (result) {
          guildPrefixes[guildID] = result.prefix;
          cache.push({ id: guildID, prefix: result.prefix });
        } else {
          guildPrefixes[guildID] = globalPrefix;
          cache.push({ id: guildID, prefix: globalPrefix });
        }
      }
      console.log(guildPrefixes);
    }
  } catch (err: any) {
    console.log(`An error occured \n\n\n\n\n\n\n ${err.stack}`);
    return;
  }
}
export async function clearCache() {
  cache.length = 0;
}
