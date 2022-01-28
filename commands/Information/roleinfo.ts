const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "roleinfo",
  description: "Shows Information About a Role",
  category: "Information",
  memberpermissions: ["VIEW_CHANNEL"],
  cooldown: 2,
  usage: "roleinfo <role mentioned or typed>",
  run: async (client, message, args) => {
    if (!args[0]) return message.reply("Role Was Not Specified");
    else {
      const embed = new MessageEmbed();
      if (message.mentions.roles.first()) {
        const role = message.mentions.roles.first();
        embed
          .setTitle("Role Information for " + `${role.name}`)
          .addField("Name", role.name, true)
          .addField("ID", role.id.toString(), true)
          .addField("Created At", `<t:${role.createdAtTimestamp}:R>`, true)
          .addField("Color", role.color.toString(), true)
          .addField("Display Seperate", role.hoist ? "Yes" : "No", true)
          .addField(
            "Members Who Have This Role",
            role.members.size.toString(),
            true
          )
          .addField("Mentionable", role.mentionable ? "Yes" : "No", true);
        embed
          .setColor("LUMINOUS_VIVID_PINK")
          .setFooter(`Requested By ${message.author.tag}`);
        message.reply({ embeds: [embed] });
      } else {
        const roleToBeFound = args.join(" ").toLowerCase();
        const role = message.guild.roles.cache.find(
          (r) => r.name.toLowerCase() === roleToBeFound
        );
        if (!role) return message.channel.send("Invalid Role");
        else {
          embed
            .setTitle("Role Information for " + `${role.name}`)
            .addField("Name", role.name, true)
            .addField("ID", role.id.toString(), true)
            .addField(
              "Created At",
              `<t:${Math.floor(role.createdTimestamp / 1000)}:R>`,
              true
            )
            .addField("Color", role.color.toString(), true)
            .addField("Display Seperate", role.hoist ? "Yes" : "No", true)
            .addField(
              "Members Who Have This Role",
              role.members.size.toString(),
              true
            )
            .addField("Mentionable", role.mentionable ? "Yes" : "No", true);
          embed
            .setColor("LUMINOUS_VIVID_PINK")
            .setFooter(`Requested By ${message.author.tag}`);
          message.reply({ embeds: [embed] });
        }
      }
    }
  },
};
