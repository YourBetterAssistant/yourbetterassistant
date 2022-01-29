"use strict";

import { Client, CommandInteraction, MessageEmbed } from "discord.js";
export default {
  name: "rifle",
  description: "rifle",
  options: [{ name: "user", description: "user", type: 6 }],
  run: async (client: Client, interaction: CommandInteraction) => {
    let user = interaction.options.getUser("user");
    const embed = new MessageEmbed().setTitle("Rifle").setColor("GREEN");
    if (!user) {
      let img = interaction.user.displayAvatarURL();
      img = img.replace(".webp", ".png");
      embed.setImage(`https://api.weky.xyz/canvas/rifleshoot?image=${img}`);
      interaction.reply({ embeds: [embed] });
      return;
    } else {
      let img = user.displayAvatarURL();
      img = img.replace(".webp", ".png");
      embed.setImage(`https://api.weky.xyz/canvas/rifleshoot?image=${img}`);
      interaction.reply({ embeds: [embed] });
    }
  },
};
//https://api.weky.xyz/canvas/whodidthis?image=${img}
