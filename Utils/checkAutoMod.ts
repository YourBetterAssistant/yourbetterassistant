import { Message } from "discord.js";
import autoMod from "../Schemas/autoMod";
import logger from "../lib/logger";
const Logger = new logger("Utils - AutoMod");
const autoModCache: { id: string | undefined; strictmode: string }[] = [];
export async function checkAutoMod(message: Message) {
  let result = await autoModCache.find((i) => i.id == message?.guild?.id);
  if (!result) {
    let result = await autoMod.findOne({ guildId: message?.guild?.id });
    Logger.info("new cache for automod");
    if (!result) {
      autoModCache.push({ id: message?.guild?.id, strictmode: "none" });
    } else {
      autoModCache.push({
        id: message?.guild?.id,
        strictmode: result.strictMode.toString(),
      });
    }
  } else {
  }
  result = await autoModCache.find((i) => i.id == message?.guild?.id);
  return result;
}
export async function forceNewCache() {
  autoModCache.length = 0;
  // let result=await autoMod.findOne({guildId:message.guild.id})
  // if(!result.guildId){
  //     autoModCache.push({id:message.guild.id, strictmode:'none'})
  // }else{
  //     autoModCache.push({id:message.guild.id, strictmode:result.strictMode})
  // }
}
