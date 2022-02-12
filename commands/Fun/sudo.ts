"use strict";

import { Client, Message } from "discord.js";
import { Sudo } from "weky";
export default {
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
    const msg = args.slice(1).join(" ");
    Sudo({
      message: message,
      member: message.mentions.members?.first()!,
      text: msg,
      deleteMessage: true,
    });
  },
};
