const { MessageEmbed } = require("discord.js");
const serverConfSchema = require("../Schemas/serverConfSchema");
const roles = {};
module.exports = {
  name: "unmute",
  description: "unmute",
  options: [{ name: "user", description: "user", type: 6,required:true }],
  run: async (client, interaction) => {
    let user = interaction.options.getMember("user");
    let result = await serverConfSchema.findOne({
      _id: interaction.guild.id,
    });
    let admin = result.adminroleID;
    let member = result.memberroleID;
    let owner = result.ownerroleID;
    roles[interaction.guild.id] = { admin, member, owner };
    let memberrole = roles[interaction.guild.id].member;
    if (!memberrole)
      return interaction.reply({
        content:
          "I cannot unmute without a member role, please do b!serverconfig to set up `ROLES` so that i can give the user the specified roles for member when their unmute is up",
        ephemeral: true,
      });
    if (!interaction.member.permissions.has("MANAGE_ROLES"))
      return interaction.reply({
        content: "Invalid Permissions, Expected Perms `MANAGE_ROLES`",
        ephemeral: true,
      });
    if (user.permissions.has("MANAGE_GUILD"))
      return interaction.reply({
        content:
          "The user who you attempted to unmute has the permissions `MANAGE_GUILD` I am not allowed to unmute people with such permissions",
        ephemeral: true,
      });
    user.roles.set([memberrole]);
    let embed = new MessageEmbed()
      .setTitle("Unmute")
      .setDescription(`${user}'s mute has ended`)
      .setColor("RANDOM");
    interaction.channel.send({ embeds: [embed] });
  },
};
//https://api.weky.xyz/canvas/whodidthis?image=${img}
