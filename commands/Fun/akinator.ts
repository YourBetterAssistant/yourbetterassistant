"use strict";

import { Client, Message } from "discord.js";
const akinator = require("discord.js-akinator");
module.exports = {
  name: "akinator",
  aliases: ["aki"],
  description: "Akinator",
  category: "Fun",
  memberpermissions: "VIEW_CHANNEL",
  cooldown: 5,
  usage: "akinator",
  run: async (client: Client, message: Message, args: string[]) => {
    const language = "en"; //The Language of the Game
    const childMode = false; //Whether to use Akinator's Child Mode
    const useButtons = true; //Whether to use Discord's Buttons
    akinator(message, {
      language: language, //Defaults to "en"
      childMode: childMode, //Defaults to "false"
      useButtons: useButtons, //Defaults to "false"
    });
  },
};
