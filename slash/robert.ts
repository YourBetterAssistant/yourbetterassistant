import { Client, CommandInteraction, MessageEmbed } from "discord.js";
module.exports = {
  name: "robert",
  description: "robert",
  options: [{ name: "user", description: "user", type: 6 }],
  run: async (client: Client, interaction: CommandInteraction) => {
    let user = interaction.options.getUser("user");
    const embed = new MessageEmbed().setTitle("Robert").setColor("GREEN");
    if (!user) {
      let img = interaction.user.displayAvatarURL();
      img = img.replace(".webp", ".png");
      embed.setImage(`https://api.weky.xyz/canvas/robert?image=${img}`);
      interaction.reply({ embeds: [embed] });
      return;
    } else {
      let img = user.displayAvatarURL();
      img = img.replace(".webp", ".png");
      embed.setImage(`https://api.weky.xyz/canvas/robert?image=${img}`);
      interaction.reply({ embeds: [embed] });
    }
  },
};
//https://api.weky.xyz/canvas/whodidthis?image=${img}
