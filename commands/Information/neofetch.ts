import { Client, Message, MessageEmbed } from "discord.js";
import funcs from "../../handlers/functions";
const osInfo = require("@felipebutcher/node-os-info");
//@ts-check
module.exports = {
  name: "neofetch",
  description: "Shows Information About The Bot's Hardware",
  category: "Information",
  memberpermissions: ["VIEW_CHANNEL"],
  cooldown: 5,
  usage: "neofetch",
  run: async (client: Client, message: Message, args: string[]) => {
    const { delay, secondsToHMS } = funcs;
    const getProperOS = () => {
      const platform = process.platform;
      if (platform === "aix") return "IBM AIX";
      if (platform == "cygwin") return "Cygwin";
      if (platform === "android") return "Andriod";
      if (platform === "freebsd") return "FreeBSD";
      if (platform === "darwin") return "MacOS";
      if (platform === "haiku") return "Haiku";
      if (platform === "linux") return "Linux";
      if (platform === "netbsd") return "NetBSD";
      if (platform === "openbsd") return "OpenBSD";
      if (platform === "sunos") return "SunOS";
      if (platform === "win32") return "Windows or Windows API";
      else return "Unknown";
    };
    const embed = new MessageEmbed().addField(
      "Operating System",
      getProperOS()
    );
    osInfo.cpu(async (cpu: number) => {
      await embed.addField("CPU-Load", `${Math.round(cpu * 100)}%`);
    });
    osInfo.mem(async (memory: number) => {
      await embed.addField("Memory Used", `${Math.round(memory * 100)}%`);
    });
    osInfo.disk(async (disk: number) => {
      embed.addField("Disk Used", `${Math.round(disk * 100)}%`);
    });
    let m = await message.channel.send("Retrieving Data...");
    function bytesToSize(bytes: number) {
      var sizes = ["Bytes", "KB", "MB", "GB", "TB"];
      if (bytes == 0) return "0 Byte";
      var i = Math.floor(Math.log(bytes) / Math.log(1024));
      return Math.round(bytes / Math.pow(1024, i)) + " " + sizes[i];
    }
    await delay(4000);
    embed
      .setTitle("NeoFetch")
      .setColor("DARK_RED")
      .addField("Memory Usage", bytesToSize(process.memoryUsage().heapUsed))
      .addField(
        "Total memory Allocation",
        bytesToSize(process.memoryUsage().heapTotal)
      )
      .addField(
        "External Memory Usage",
        bytesToSize(process.memoryUsage().external)
      )
      .addField(
        "Array buffers",
        bytesToSize(process.memoryUsage().arrayBuffers)
      )
      .addField("RSS", bytesToSize(process.memoryUsage().rss))
      .addField(
        "Raw Uptime",
        secondsToHMS(Math.floor(process.uptime())).toString()
      )
      .setFooter(
        "Requested By: " + message.author.tag,
        message.author.displayAvatarURL({ dynamic: true })
      )
      .setTimestamp(new Date());
    m.delete();
    message.channel.send({ embeds: [embed] });
  },
};
