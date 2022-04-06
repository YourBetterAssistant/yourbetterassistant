"use strict";

//Remember Download the stuff =)
import { Random } from "random-js";
const Math = require("math");
import Discord, { Client, Message } from "discord.js";
const random = new Random(); // uses the nativeMath engine
let heads = 1;
let tails = 0;
const value = Math.floor(Math.random());
module.exports = {
  name: "coinflip",
  aliases: ["ht", "th"],
  description: "flips a coin",
  category: "Fun",
  memberpermissions: "VIEW_CHANNEL",
  cooldown: 5,
  usage: "coinflip",
  run: async (client: Client, message: Message, args: string[]) => {
    await value;
    if (message.author.bot) return;
    if (value === heads) {
      const embed = new Discord.MessageEmbed()
        .setTitle("You Got Heads!")
        .setDescription("congrats you got heads!")
        .setImage(
          "https://lh3.googleusercontent.com/SRJZryeljJHRxVt6b_nCT_XWDKwDqgViehnN6yc-KXGQgZEb7KbVMhc2dW7P69yvCcvnTA=s87"
        );
      message.channel.send({ embeds: [embed] });
    }
    if (value === tails) {
      const embed = new Discord.MessageEmbed()
        .setTitle("You Got Tails!")
        .setDescription("congrats you got tails!")
        .setImage(
          "https://lh3.googleusercontent.com/etXQadBecvemERl7DWSizrPRVHdrsHcNeAq_EYffM77UuAFbwLOWfJY1AqbkH9Z9U809_A=s85"
        );
      message.channel.send({ embeds: [embed] });
    }
  },
};
