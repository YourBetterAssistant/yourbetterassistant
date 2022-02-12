"use strict";

import { Client, Message } from "discord.js";
import { reply } from "../../exports";
const djsGames = require("djs-games");
export default {
  name: "gtn",
  aliases: ["guessthenumber"],
  description: "guess the number game",
  memberpermissions: "VIEW_CHANNEL",
  adminPermOverride: true,
  cooldown: 2,
  usage: "gtn",
  run: async (client: Client, message: Message, args: string[]) => {
    reply("Starting Game", true, message);

    const guessTheNumber = new djsGames.GuessTheNumber();
    guessTheNumber.startGame(message);
  },
};
