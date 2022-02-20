"use strict";

import { Client, Message } from "discord.js";

module.exports = {
  name: "roleremove",
  description: "remove roles to users",
  category: "Administration",
  memberpermissions: "MANAGE_ROLES",
  adminPermOverride: true,
  cooldown: 2,
  usage: "role <user> <roleID>",
  run: async (client: Client, message: Message, args: string[]) => {
    if (!args[1])
      return message.channel.send("Which role do you expect me to remove?");
    if (!args[0]) return message.channel.send("Who is going to lose the role?");
    let user = message.mentions.users.first();
    if (!user) return message.channel.send("The user could not be found");
    let role = args.slice(1).join(" ");
    let rolguild = message.guild?.roles.cache.find((r) => r.name === role);
    if (!rolguild)
      rolguild = message.guild?.roles.cache.find((r) => r.id === role);
    let uv = message.guild?.members.cache.get(user.id);
    uv?.roles.remove(rolguild!).catch((err) => {
      message.channel.send("An error happened");
      return console.log(err);
    });
    message.channel.send("Roles changed");
  },
};
