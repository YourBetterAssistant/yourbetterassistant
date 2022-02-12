import { Message } from "discord.js";
import { Client } from "discord.js";
("use strict");
import { reply } from "../../exports";
import { exec } from "child_process";
module.exports = {
  name: "restart",
  aliases: ["reboot"],
  description: "restarts bot",
  category: "OWNER",
  memberpermissions: "VIEW_CHANNEL",
  cooldown: 2,
  usage: "restart",
  run: async (client: Client, message: Message, args: string[]) => {
    let ownerId = "827388013062389761";
    if (message.author.id !== ownerId) {
      message.channel.send("You cannot pull");
      console.log("bruh");
      return;
    }
    await reply("Restarting", true, message);
    await exec("pm2 restart 0");
  },
};
