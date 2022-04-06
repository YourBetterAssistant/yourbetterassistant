"use strict";

import Discord, { Message, Client } from "discord.js";
import workSchema from "../../Schemas/workSchema";
import id from "../../botconfig/id.json";
import s from "../../botconfig/salary.json";
import money from "../../Constructors/economy";
import { default as axios } from "axios";
const economy = new money();
module.exports = {
  name: "work",
  description: "work ",
  category: "Economy",
  guildOnly: true,
  memberpermissions: "VIEW_CHANNEL",
  adminPermOverride: true,
  cooldown: 60 * 60 * 1,
  usage: "work",
  run: async (client: Client, message: Message) => {
    let job;
    try {
      let j = await workSchema.findOne({
        userID: message.author.id,
      });
      if (!j) {
        return message.reply("You do not have a job! Run b!hire");
      } else job = j.job;
    } catch (err) {
      return message.channel.send("Error Has Occured Try Again Later");
    }
    if (!job) {
      message.reply("You do not have a job! Run b!hire");
    }
    let salary1 = s[1];
    let salary2 = s[2];
    let salary3 = s[3];
    let possibleJobs: any[] = [];
    await axios
      .get("https://random-word-api.herokuapp.com/word?number=1")
      .then((val) => possibleJobs.push(val.data.toString()));
    let embed = new Discord.MessageEmbed()
      .setTitle(`JOB:${job}`)
      .setDescription("Type the word in")
      .addField("Word:", `${possibleJobs[0]}`, true)
      .setColor("GREEN");
    message.channel.send({ embeds: [embed] });
    let sal: any;
    if (job === id[1]) {
      sal = salary1;
    } else if (job === id[2]) {
      sal = salary2;
    } else if (job === id[3]) {
      sal = salary3;
    }
    const randomCoins = Math.floor(Math.random() * 500) + 1;
    let filter = (m: Message) => m.author.id === message.author.id;
    message.channel
      .awaitMessages({
        filter,
        max: 1,
        time: 10000,
        errors: ["time"],
      })
      .then(async (m) => {
        const msg = m.first();
        if (msg?.content === possibleJobs[0]) {
          msg?.channel.send(`CORRECT YOU HAVE EARNT ${sal}YBCs`);
          economy.addCoins(msg?.author.id!, parseInt(sal));
          return;
        } else {
          msg?.channel.send(`WRONG! YOU HAVE EARNT ${randomCoins}YBCs`);
        }
        economy.addCoins(msg?.author.id!, randomCoins);
        return;
      })
      .catch((err) => {
        if (err) {
          message.channel.send(`Sed time ran out here is ${randomCoins}YBCs`);
          economy.addCoins(message.author.id, randomCoins);
        }
      });
  },
};
