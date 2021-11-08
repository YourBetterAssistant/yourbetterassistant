const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "prefix",
  description: "Reminder of what the prefix is",
  options: [],
  run: async (client, interaction) => {
    if (!interaction.guild) return interaction.reply("No prefix for dms");
    const embed = new MessageEmbed()
      .setTitle("Prefix")
      .setDescription(
        `The prefix is \`${client.prefix[interaction.guild.id]}\``
      );
    interaction.reply({ embeds: [embed] });
  },
};
