"use strict";

import Levels from "discord-xp";
import Discord, { Client, Message } from "discord.js";
module.exports = {
  name: "rank",
  description: "Shows the rank of the user",
  category: "levels",
  guildOnly: true,
  memberpermissions: "VIEW_CHANNEL",
  cooldown: 2,
  usage: "rank [user]",
  run: async (client: Client, message: Message) => {
    const canvacord = require("canvacord");

    const target = message.mentions.members?.first() || message.member; // Grab the target.

    const user = await Levels.fetch(target?.id!, message.guild?.id!, true); // Selects the target from the database.
    if (!user) return message.channel.send("You don't have a level");
    console.log(target);
    const rank = new canvacord.Rank()
      .setStatus(target?.presence ? target.presence.status : "online") // Build the Rank Card
      .setAvatar(target?.user.displayAvatarURL({ format: "png", size: 512 }))
      .setCurrentXP(user.xp) // Current User Xp
      .setRequiredXP(Levels.xpFor(user.level + 1)) // We calculate the required Xp for the next level
      .setLevel(user.level) // Current Level of the user
      .setProgressBar("#FFFFFF")
      .setUsername(target?.user.username)
      .setDiscriminator(target?.user.discriminator);

    rank.build().then((data: any) => {
      let attachement = new Discord.MessageAttachment(data, "Rank.png");
      message.channel.send({ files: [attachement] });
    });
  },
};
