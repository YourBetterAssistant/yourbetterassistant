"use strict";

import { Client, Message } from "discord.js";

module.exports = {
  name: "eval",
  aliases: ["evaluate"],
  description: "Evals code",
  category: "OWNER",
  memberpermissions: "VIEW_CHANNEL",
  cooldown: 5,
  usage: "eval [secrets]",
  run: async (client: Client, message: Message, args: string[]) => {
    if (message.author.id !== "827388013062389761") return;
    let banned = ["rm", "rf", "remove", "delete", "./"];
    let bannedTrue = false;
    banned.forEach((word) => {
      if (message.content.includes(word)) {
        message.channel.send("Banned Command");
        bannedTrue = true;
      }
    });
    args.shift();
    bannedTrue ? null : eval(args.join(" "));
  },
};
