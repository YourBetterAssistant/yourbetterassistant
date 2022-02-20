"use strict";

import { Client, Message } from "discord.js";

import { Calculator } from "weky";
module.exports = {
  name: "calculator",
  description: "Spawns Calaculator",
  category: "Information",
  guildOnly: true,
  memberpermissions: "VIEW_CHANNEL",
  cooldown: 5,
  usage: "calculator",
  run: async (client: Client, message: Message) => {
    await Calculator({
      message: message,
      embed: {
        title: "Calculator",
        color: "#7289da",
        timestamp: true,
      },
      disabledQuery: "Calculator is disabled!",
      invalidQuery: "The provided equation is invalid!",
      othersMessage: "Only <@{{author}}> can use the buttons!",
    });
  },
};
