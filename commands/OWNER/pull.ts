import { Message } from "discord.js";
import { Client } from "discord.js";
("use strict");

import { exec } from "child_process";
import { reply } from "../../exports";
module.exports = {
  name: "pull",
  description: "pulls the latest version of this code from github",
  category: "OWNER",
  memberpermissions: "VIEW_CHANNEL",
  cooldown: 2,
  usage: "pull",
  run: async (client: Client, message: Message) => {
    let ownerId = "827388013062389761";
    if (message.author.id !== ownerId) {
      message.channel.send("You cannot pull");
      console.log("bruh");
      return;
    }

    let link = "https://www.github.com/NotTimIsReal/bbarevamp";
    reply(`Pulling from **${link}**`, true, message);
    exec(`git pull ${link}`, (err) => {
      if (err) return message.reply(`Error: \`\`\`${err.stack}\`\`\``);
    });

    message.reply("Do you want me to reboot");
    let filter = (m: Message) => m.author.id === message.author.id;
    message.channel
      .awaitMessages({
        filter,
        max: 1,
        time: 10000,
        errors: ["time"],
      })
      .then((m) => {
        const msg = m.first();
        if (msg?.content.startsWith("yes")) {
          exec("pm2 restart 0");
        } else {
          return message.channel.send("Cancelled");
        }
      });
  },
};
