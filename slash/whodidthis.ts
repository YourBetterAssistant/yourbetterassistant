import {
  Client,
  CommandInteraction,
  Interaction,
  MessageEmbed,
} from "discord.js";
export default {
  name: "whodidthis",
  description: "Who did this",
  options: [{ name: "user", description: "user", type: 6 }],
  run: async (client: Client, interaction: CommandInteraction) => {
    let user = interaction.options.getUser("user");
    const embed = new MessageEmbed()
      .setTitle("Who Did This???")
      .setColor("GREEN");
    if (!user) {
      let img = interaction.user.avatarURL({ format: "png" });
      embed.setImage(`https://api.weky.xyz/canvas/whodidthis?image=${img}`);
      interaction.reply({ embeds: [embed] });
      return;
    } else {
      let img = user.displayAvatarURL({ format: "png" });
      embed.setImage(`https://api.weky.xyz/canvas/whodidthis?image=${img}`);
      interaction.reply({ embeds: [embed] });
    }
  },
};
//https://api.weky.xyz/canvas/whodidthis?image=${img}
