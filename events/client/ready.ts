"use strict";
//here the event starts
require("dotenv").config();
import logger from "../../lib/logger";
import mongo from "../../botconfig/mongo";
import { Client, MessageAttachment, TextChannel } from "discord.js";
import axios from "axios";
module.exports = async (client: Client) => {
  const Logger = new logger("Events - Ready");
  try {
    Logger.log(`Logged into ${client.user?.tag}`, true);
  } catch {
    /* */
  }

  //Change status each 10 minutes
  let change;
  try {
    change = false;
    client.user?.setStatus("dnd");
    client.user?.setActivity(`${client.users.cache.size} users`, {
      type: "WATCHING",
    });
    setInterval(async () => {
      client.user?.setActivity(`${client.users.cache.size} users`, {
        type: "WATCHING",
      });
    }, 600000);
  } catch (e: any) {
    Logger.error(e);
  }

  await mongo().then((mongoose) => {
    try {
      Logger.info("Connected!");
    } catch (err: any) {
      Logger.error(`error \n\n ${err.stack}`);
    }
  });

  client.guilds.cache.forEach((guild) => {
    Logger.log(guild.name);
  });
  client.interactions.forEach(async (inter) => {
    //return client.api.applications(client.user.id).commands.set([])
    if (inter.guild == true && !inter.options) {
      client.api
        .applications(client.user?.id)
        .guilds("879927834058043492")
        .commands.post({
          data: {
            name: inter.name,
            description: inter.description,
            default_permission: inter.permissions == false ? false : true,
          },
        });
    } else if (inter.guild == true && inter.options) {
      client.api
        .applications(client.user?.id)
        .guilds("879927834058043492")
        .commands.post({
          data: {
            name: inter.name,
            description: inter.description,
            options: inter.options,
            default_permission: inter.permissions == false ? false : true,
          },
        });
    } else if (!inter.guild && inter.options) {
      client.api.applications(client.user?.id).commands.post({
        data: {
          name: inter.name,
          description: inter.description,
          options: inter.options,
          default_permission: inter.permissions == false ? false : true,
        },
      });
    } else {
      await client.api.applications(client.user?.id).commands.post({
        data: {
          name: inter.name,
          description: inter.description,
          default_permission: inter.permissions == false ? false : true,
        },
      });
    }
  });
  await axios
    .post("https://api.yourbetterassistant.me/api/bot/stats/update", {
      secret: process.env.APISECRET,
      commands: Array.from(client.commands),
      interaction: Array.from(client.interactions),
    })
    .then(() => {
      Logger.info("Posted Stats To Backend");
    });
};

/** Template by Tomato#6966 | https://github.com/Tomato6966/Discord-Js-Handler-Template */
/**/
