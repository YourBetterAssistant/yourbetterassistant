"use strict";

import chatbot from "../../Schemas/chatbot";
import countSchema from "../../Schemas/countSchema";
import logSchema from "../../Schemas/logSchema";
import prefix from "../../Schemas/prefixSchema";
import rr from "../../Schemas/rrSchema";
import conf from "../../Schemas/serverConfSchema";
import welcome from "../../Schemas/welcomeSchema";
import mongo from "../../botconfig/mongo";
import { Client, Guild } from "discord.js";
export default async (client: Client, guild: Guild) => {
  console.log(guild.id);
  await mongo().then(async () => {
    try {
      await chatbot.findOneAndRemove({ guildID: guild.id });
      await countSchema.findOneAndRemove({ _id: guild.id });
      await logSchema.findOneAndRemove({ _id: guild.id });
      await prefix.findOneAndRemove({ _id: guild.id });
      await conf.findOneAndRemove({ _id: guild.id });
      await welcome.findOneAndRemove({ _id: guild.id });
    } catch (err) {}
  });
};
