"use strict";

import { Client, Message, TextChannel } from "discord.js";
module.exports = {
  name: "sudo",
  aliases: ["imitate"],
  description: "makes a webhook of the defined user",
  category: "Fun",
  guildOnly: true,
  memberpermissions: "MANAGE_WEBHOOKS",
  cooldown: 10,
  usage: "sudo <user> <message>",
  run: async (client: Client, message: Message, args: string[]) => {
    if (!args[0]) return message.reply("Who is the user?");
    if (!args[1]) return message.reply("What is the message?");
    const member = message.mentions.members?.first();
    if (
      message.content.split(" ")[0] ===
      (`<@!${client.user?.id}>` || `<@${client.user?.id}>`)
    ) {
      const member = message.mentions.members?.first(2)[1];
      const msg = args.slice(1).join(" ");
      const webhook = await (message.channel as TextChannel).createWebhook(
        member?.displayName!,
        {
          avatar: member?.user?.displayAvatarURL(),
          reason: "Sudo Command Executed",
        }
      );
      message.delete();
      await webhook.send(msg);
      webhook.delete("No use");
      return;
    }
    const msg = args.slice(1).join(" ");
    const webhook = await (message.channel as TextChannel).createWebhook(
      member?.displayName!,
      {
        avatar: member?.user?.displayAvatarURL(),
        reason: "Sudo Command Executed",
      }
    );
    message.delete();
    await webhook.send(msg);
    webhook.delete("No use");
  },
};
