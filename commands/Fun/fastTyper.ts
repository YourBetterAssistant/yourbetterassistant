"use strict";

import { Client, Message } from "discord.js";
import { reply } from "../../exports";
module.exports = {
  name: "fasttyper",
  aliases: ["typer"],
  description: "typer game",
  category: "Fun",
  memberpermissions: "VIEW_CHANNEL",
  cooldown: 10,
  usage: "typer",
  run: async (client: Client, message: Message, args: string[]) => {
    reply("Starting", false, message);
    const djsGames = require("djs-games");
    const FastTyper = new djsGames.FastTyper();
    FastTyper.startGame(message);
  },
};
