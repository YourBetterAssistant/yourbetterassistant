"use strict";

import { Client, GuildMember, TextChannel } from "discord.js";
import countSchema from "../../Schemas/countSchema";

import logSchema from "../../Schemas/logSchema";
import mongo from "../../botconfig/mongo";
import Discord from "discord.js";
export default async (client: Client, member: GuildMember) => {
  await mongo().then(async () => {
    try {
      const guild = client.guilds.cache.get(member.guild.id);
      let countInfo = await countSchema.findOne({ _id: member.guild.id });
      const vc = countInfo?.voiceChannelID;
      let logInfo = await logSchema.findOne({ _id: member.guild.id });
      let logChannelID = logInfo?.channelID;
      const logChannel = member.guild.channels.cache.get(logChannelID!);
      let embed = new Discord.MessageEmbed()
        .setTitle("Member Left")
        .setDescription("Goodbye person hope we see you again")
        .addField("Member", `${member}`)
        .setColor("RANDOM");
      (logChannel as TextChannel).send({ embeds: [embed] });
      setInterval(async function () {
        try {
          await guild?.members.fetch({ force: true });
          var memberCount = guild?.members.cache.filter(
            (member) => !member.user.bot
          ).size;
          var memberCountChannel = guild?.channels.cache.get(vc);
          memberCountChannel?.setName(`${memberCount} members!`);
        } catch (err) {
          return;
        }
      }, 1000);
    } catch (err: any) {
      console.log(err.stack);
    }
  });
};
