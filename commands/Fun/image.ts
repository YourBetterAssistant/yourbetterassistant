"use strict";

import Discord, { Client, Message } from "discord.js";
// npm i images-scraper
import Scraper from "images-scraper";
const google = new Scraper({
  puppeteer: {
    //@ts-ignore
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
    executablePath: "/usr/bin/chromium",
  },
  safe: true,
  userAgent: "YBA",
});
//@ts-check
module.exports = {
  name: "image",
  description: "displays an image searched from the web",
  category: "Fun",
  memberpermissions: ["VIEW_CHANNEL", "ATTACH_FILES"],
  cooldown: 10,
  usage: "image <query>",
  run: async (client: Client, message: Message, args: string[]) => {
    const image_query = args.join(" ");
    if (!image_query) return message.channel.send("Bruh what is the argument ");
    message.channel.send("Searching ...");
    const image_results = await google.scrape(image_query, 1);
    console.log(image_results.title);
    let embed = new Discord.MessageEmbed()
      .setTitle(image_results.title)
      .setURL(image_results.url)
      .setImage(image_results.url);

    message.channel.send({ embeds: [embed] });
  },
};
