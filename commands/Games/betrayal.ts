"use strict";

import { DiscordTogether } from "discord-together";
import { Message } from "discord.js";
import { reply } from "../../exports";
module.exports = {
  name: "betrayal",
  description: "Play betrayal with your buds",
  category: "Games",
  guildOnly: true,
  memberpermissions: "VIEW_CHANNEL",
  cooldown: 10,
  usage: "betrayal",
  run: async (client: any, message: Message) => {
    client.discordTogether = new DiscordTogether(client);
    if (!message.member?.voice.channel)
      return reply("You need to be in a VC", true, message);
    client.discordTogether
      .createTogetherCode(message.member.voice.channel.id, "betaryal")
      .then(async (invite: { code: string }) => {
        if (invite.code == "https://discord.com/invite/50013")
          return message.channel.send(
            "An error occured while creating that invite, make sure I have the permission: `CREATE-INVITE` and that this channel allows me to send invites"
          );
        else return message.channel.send(`${invite.code}`);
      });
  },
};
