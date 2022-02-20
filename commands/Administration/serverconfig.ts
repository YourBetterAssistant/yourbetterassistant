"use strict";

import { Client, Message } from "discord.js";

module.exports = {
  name: "serverconfig",
  description: "DEPRECATED USE WEBSITE",
  category: "Administration",
  memberpermissions: "MANAGE_GUILD",
  run: async (client: Client, message: Message, args: string[]) => {
    message.channel.send(
      "This command is deprecated please use the website https://yourbetterassistant.me"
    );
  },
};
