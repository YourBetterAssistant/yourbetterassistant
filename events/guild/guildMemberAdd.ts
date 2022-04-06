"use strict";

import { Client, GuildMember, TextChannel } from "discord.js";
import welcomeSchema from "../../Schemas/welcomeSchema";
import logSchema from "../../Schemas/logSchema";
import countSchema from "../../Schemas/countSchema";
import joinRoles from "../../Schemas/onJoin";
import mongo from "../../botconfig/mongo";
import Discord from "discord.js";
import Logger from "../../lib/logger";
module.exports = async (client: Client, member: GuildMember) => {
  const logger = new Logger("Events - GuildMemberAdd");
  const onJoin = async (member: GuildMember) => {
    const guild = client.guilds.cache.get(member.guild.id);
    await mongo().then(async () => {
      try {
        //Look for vc
        await guild?.members.fetch({ force: true });
        let countInfo = await countSchema.findOne({ _id: member.guild.id });
        if (!countInfo) return;
        const vc = countInfo.voiceChannelID;
        setInterval(function () {
          var memberCount = guild?.members.cache.filter(
            (member) => !member.user.bot
          ).size;
          var memberCountChannel = guild?.channels.cache.get(vc);
          memberCountChannel?.setName(`${memberCount} members!`);
        }, 1000);
        //Member log
        let logInfo = await logSchema.findOne({ _id: member.guild.id });
        let logChannelID = logInfo?.channelID;
        const logChannel = member.guild.channels.cache.get(logChannelID!);
        let embed = new Discord.MessageEmbed()
          .setTitle("New Member")
          .setDescription(`Our Newest Member!`)
          .addField("Member", `${member}`)
          .setColor("RANDOM");
        (logChannel as TextChannel).send({ embeds: [embed] });
        //Start the Welcome Message

        let info = await welcomeSchema.findOne({ _id: member.guild.id });
        let channelID = info?.channelID;
        let text = info?.text;
        let option = info?.DM;
        const channel = member.guild.channels.cache.get(channelID!);
        if (option === "true") {
          member.send(`>>> <@!${member.id}> ${text}`);
        } else {
          (channel as TextChannel).send(`>>> <@!${member.id}> ${text}`);
        }
        // add roles if any
        const role = await joinRoles.findOne({ guildId: member.guild.id });
        if (role) {
          member.roles.add(role.roleId, "Joined Server");
        }
      } catch (err: any) {
        logger.error(`${err.stack}`);
      }
    });
  };
  await onJoin(member);
};
