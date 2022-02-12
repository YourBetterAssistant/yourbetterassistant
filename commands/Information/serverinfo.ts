"use strict";

import { Client, Message, MessageEmbed } from "discord.js";
import funcs from "../../handlers/functions";

export default {
  name: "serverinfo",
  description: "shows an in-depth result of the server",
  category: "Information",
  memberpermissions: "VIEW_CHANNEL",
  cooldown: 5,
  usage: "serverinfo",
  run: async (client: Client, message: Message, args: string[]) => {
    const { delay } = funcs;
    args;
    //https://discord.com/developers/docs/resources/guild#guild-object-guild-features
    let msg = await message.channel.send("Getting Info...");
    delay(1000);
    msg.edit("Results Found! Placing information...");
    let embed = new MessageEmbed()
      .setTitle(`Server Info of ${message.guild?.name}`)
      .setColor("DARK_BLUE")
      .setThumbnail(
        `https://cdn.discordapp.com/icons/${message.guild?.id}/${message.guild?.icon}`
      )
      .addFields(
        {
          name: "Members",
          value: `${message.guild?.memberCount}`,
          inline: true,
        },
        { name: "Owner", value: `<@!${message.guild?.ownerId}>`, inline: true },
        {
          name: "Humans",
          value: message.guild?.members.cache
            .filter((m) => !m.user.bot)
            .size.toString()!,
          inline: true,
        },
        {
          name: "Bots",
          value: message.guild?.members.cache
            .filter((m) => m.user.bot)
            .size.toString()!,
          inline: true,
        },
        {
          name: "Banned Members",
          value: message.guild?.bans.cache.size.toString()!,
          inline: true,
        },
        {
          name: "Roles",
          value: message.guild?.roles.cache.size.toString()!,
          inline: true,
        },
        {
          name: "Rules Channel",
          value: `<#${message.guild?.rulesChannelId}>`,
          inline: true,
        },
        {
          name: "Emojis",
          value: message.guild?.emojis.cache.size.toString()!,
          inline: true,
        },
        {
          name: "Stickers",
          value: message.guild?.stickers.cache.size.toString()!,
          inline: true,
        },
        {
          name: "Verification Level",
          value: message.guild?.verificationLevel!,
          inline: true,
        },
        {
          name: "Created At",
          value: `<t:${Math.floor(message.guild?.createdTimestamp! / 1000)}>`,
          inline: true,
        },
        { name: "Features:", value: "**\n**", inline: false }
      );
    let e = 1;
    message.guild?.features.forEach((i) =>
      embed.addField(
        `  Feature ${e++}`,
        `  <a:greentick:881473012162002984> ${i}`,
        false
      )
    );
    msg.edit({ embeds: [embed] });
  },
};
//
