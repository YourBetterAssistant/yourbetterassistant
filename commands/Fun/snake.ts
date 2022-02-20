"use strict";

import { Client, Message } from "discord.js";
import { reply } from "../../exports";

module.exports = {
  name: "snake",
  description: "snake game",
  category: "Fun",
  memberpermissions: "VIEW_CHANNEL",
  cooldown: 5,
  usage: "snake",
  run: async (client: Client, message: Message, args: string[]) => {
    reply("Starting", true, message);
    const djsGames = require("djs-games");
    const SnakeGame = new djsGames.SnakeGame();
    SnakeGame.startGame(message);
  },
};
