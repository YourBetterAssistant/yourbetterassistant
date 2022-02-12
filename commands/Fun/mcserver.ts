"use strict";

import util from "minecraft-server-util";
import Discord, { Client, Message } from "discord.js";
export default {
  name: "mcserver",
  aliases: ["miencraft", "server"],
  description: "Display stats bout teh server you asked for",
  category: "Fun",
  cooldown: 2,
  usage: "mcserver <ip> <port>",
  run: async (client: Client, message: Message, args: string[]) => {
    if (!args[0]) return message.channel.send("the server ip mate");
    if (!args[1]) return message.channel.send("and the port(normally 25565)");
    const ip = args[0];
    const port = parseInt(args[1]);

    util
      .status(ip, port)
      .then((response) => {
        const embed = new Discord.MessageEmbed()
          .setColor("#00F5D4")
          .setTitle("MC SERVER RESULTS!")
          .addFields(
            {
              name: "Players Online:",
              value: `${response.players.online}/${response.players.max}`,
              inline: true,
            },
            {
              name: "Version Required:",
              value: response.version.name,
              inline: true,
            },
            {
              name: "Description:",
              value: response.motd.raw,
              inline: true,
            },
            {
              name: "Max Players:",
              value: `${response.players.max}`,
              inline: true,
            }
          );
        message.channel.send({ embeds: [embed] });
      })
      .catch((error) => {
        message.channel.send("Something Happened");
        throw error;
      });
  },
};
