"use strict";

import { Client, Message, MessageEmbed } from "discord.js";
import funcs from "../../handlers/functions";
const osInfo = require("@felipebutcher/node-os-info");
import packageJson from "../../package.json";
module.exports = {
  name: "botinfo",
  description: "Shows stats of bot",
  category: "Information",
  memberpermissions: "VIEW_CHANNEL",
  cooldown: 5,
  usage: "botinfo",
  run: async (client: Client, message: Message, args: string[]) => {
    const { duration } = funcs;
    const version = [];
    version.push(packageJson.version);
    message.channel.sendTyping();
    let embed = new MessageEmbed()
      .setTitle("Bot-Info")
      .addField(
        "Users",
        `**${client.users.cache.size}** users being watched`,
        true
      )
      .addField(
        "Servers",
        `${client.guilds.cache.size} servers being watched`,
        true
      )
      .addField("Gateway", `${client.ws.gateway}`, true)
      .addField("Ping", `${client.ws.ping}ms`, true)
      .addField("Shards", `${client.ws.shards.size} shards being used`, true)
      .addField("Websocket Status", `${client.ws.status}`, true)
      .addField("Uptime", `${duration(client.uptime!)}`, true)
      .addField("Command Size", client.commands.size.toString(), true)
      .addField("Slash Commands Size", client.interactions.size.toString())
      .addField("Version", version[0])
      .addField("** **", "** **")
      .setColor("BLUE");
    osInfo.cpu((cpu: number) => {
      embed.addField("CPU-Load", `${Math.round(cpu * 100)}%`, true);
    });
    osInfo.mem((memory: number) => {
      embed.addField("Memory Used", `${Math.round(memory * 100)}%`, true);
    });
    setTimeout(function () {
      message.channel.send({ embeds: [embed] });
    }, 2000);
    version.length = 0;
  },
};
