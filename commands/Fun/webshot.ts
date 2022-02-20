"use strict";

import puppeteer from "puppeteer";
import Discord, { Client, Message } from "discord.js";
import fs from "fs";
module.exports = {
  name: "screenie",
  description: "Take a screenshot of a website",
  category: "Fun",
  memberpermissions: "VIEW_CHANNEL",
  adminPermOverride: true,
  cooldown: 5,
  usage: "screenie <link-needs to start with https:// or http://>",
  run: async (client: Client, message: Message, args: string[]) => {
    function isValidHttpUrl(string: string) {
      try {
        let url = new URL(string);
      } catch (_) {
        return false;
      }
      return true;
    }
    if (!isValidHttpUrl(args[0]))
      return message.channel.send(
        "The link you sent does not start with https or http"
      );
    if (
      message.content.includes("porn") ||
      message.content.includes("xxx") ||
      message.content.includes("nude") ||
      message.content.includes("boobs") ||
      message.content.includes("dick") ||
      message.content.includes("penis") ||
      message.content.includes("pussy")
    )
      return message.channel.send(
        "The link you have provided is explicit or in our banned websites list"
      );
    message.channel.send("Searching ...");
    const browser = await puppeteer.launch({
      executablePath: "/usr/bin/chromium",
      headless: true,
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });
    const page = await browser.newPage();
    await page.goto(args[0]);
    const buffer = (await page.screenshot()) as Buffer;
    await browser.close();
    let p = new Discord.MessageAttachment(buffer, "picture.png");
    let embed = new Discord.MessageEmbed()
      .setTitle(`Result For ${args[0]}`)
      .setImage("attachment://picture.png")
      .setColor("GREEN");
    message.channel.send({ embeds: [embed], files: [p] });
    setTimeout(function () {
      fs.unlink("./images/example.png", (err) => {
        if (err) return console.log(err);
      });
    }, 1000);
  },
};
