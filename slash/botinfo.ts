"use strict";
const { duration, delay } = require("../handlers/functions");
const osInfo = require("@felipebutcher/node-os-info");
const packageJson = require("../package.json");
import Discord, { Client, CommandInteraction } from "discord.js";
export default {
  name: "botinfo",
  description: "Shows Bot Info",
  run: async (client: Client, interaction: CommandInteraction) => {
    console.log("works");
    const version = [];
    version.push(packageJson.version);
    let embed = new Discord.MessageEmbed()
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
      .addField("Uptime", `${duration(client.uptime)}`, true)
      .addField("Command Size", client.commands.size.toString(), true)
      .addField("Slash Commands Size", client.interactions.size.toString())
      .addField("Version", version[0])
      .addField("** **", "** **")
      .setColor("BLUE")
      .setAuthor(`Requested By ${interaction.user.username}`);
    osInfo.cpu((cpu: number) => {
      embed.addField("CPU-Load", `${Math.round(cpu * 100)}%`, true);
    });
    osInfo.mem((memory: number) => {
      embed.addField("Memory Used", `${Math.round(memory * 100)}%`, true);
    });
    await interaction.deferReply();
    delay(2000);
    await interaction.editReply({ embeds: [embed] });
  },
};
