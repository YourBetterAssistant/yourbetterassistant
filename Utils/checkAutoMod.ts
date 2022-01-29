import { Message } from "discord.js";
import autoMod from "../Schemas/autoMod";
const autoModCache: { id: string | undefined; strictmode: string }[] = [];
export async function checkAutoMod(message: Message) {
  console.log("running");
  let result = await autoModCache.find((i) => i.id == message?.guild?.id);
  if (!result) {
    let result = await autoMod.findOne({ guildId: message?.guild?.id });
    console.log("new cache for automod");
    if (!result) {
      autoModCache.push({ id: message?.guild?.id, strictmode: "none" });
    } else {
      autoModCache.push({
        id: message?.guild?.id,
        strictmode: result.strictMode.toString(),
      });
    }
  } else {
    console.log("cache");
  }
  result = await autoModCache.find((i) => i.id == message?.guild?.id);
  console.log(result);
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
