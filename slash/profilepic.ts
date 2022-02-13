"use strict";
import Discord, { Client, CommandInteraction } from "discord.js";
module.exports = {
  name: "profilepic",
  description: "Sends photo of profile pic",
  options: [{ name: "user", description: "user", type: 6 }],
  run: async (client: Client, interaction: CommandInteraction) => {
    let embed = new Discord.MessageEmbed().setColor("RANDOM");
    let user = interaction.options.getUser("user");
    if (!user) {
      embed
        .setImage(interaction.user.displayAvatarURL())
        .setTitle(`${interaction.user.username}'s Profile Image`);
      interaction.reply({ embeds: [embed] });
    } else {
      embed.setImage(user.displayAvatarURL()).setTitle(`Profile Image`);
      interaction.reply({ embeds: [embed] });
    }
  },
};
