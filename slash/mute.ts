import {
  Client,
  CommandInteraction,
  GuildMember,
  MessageEmbed,
} from "discord.js";
import serverConfSchema from "../Schemas/serverConfSchema";
const roles: {
  [key: string]: { admin: string; member: string; owner: string };
} = {};
module.exports = {
  name: "mute",
  description: "Mute",
  options: [
    { name: "user", description: "user", type: 6, required: true },
    {
      name: "duration",
      description: "duration",
      type: 10,
      required: true,
      choices: [
        { name: "1 Day", value: 86400000 },
        { name: "10 hours", value: 36000000 },
        { name: "5 hours", value: 18000000 },
        { name: "1 Hour", value: 3600000 },
        { name: "10 minutes", value: 600000 },
        { name: "1 minute", value: 60000 },
      ],
    },
    { name: "reason", description: "reason", type: 3 },
  ],
  run: async (client: Client, interaction: CommandInteraction) => {
    const user = interaction.options.getMember("user") as GuildMember;
    const reason = interaction.options.getString("reason");
    const duration = interaction.options.getNumber("duration") as number;
    if (interaction.guild?.roles.everyone.permissions.has("SEND_MESSAGES"))
      return interaction.reply({
        content:
          "The `@everyone` role has the permissions `SEND_MESSAGES` leaving this on will make muting users useless, TO fix this error un-toggle send messages for `@everyone`",
        ephemeral: true,
      });
    let result = await serverConfSchema.findOne({
      _id: interaction.guild?.id,
    });
    if (!result)
      return interaction.reply({
        content:
          "I cannot mute without a member role, please do b!serverconfig to set up `ROLES` so that i can give the user the specified roles for member when their mute is up",
        ephemeral: true,
      });
    let admin = result.adminroleID;
    let member = result.memberroleID;
    let owner = result.ownerroleID;
    roles[interaction.guild?.id!] = { admin, member, owner };
    let memberrole = roles[interaction.guild?.id!].member;
    if (!interaction.member?.permissions.toString().includes("MANAGE_ROLES"))
      return interaction.reply({
        content: "Invalid Permissions, Expected Perms `MANAGE_ROLES`",
        ephemeral: true,
      });
    if (user.permissions.has("MANAGE_GUILD"))
      return interaction.reply({
        content:
          "The user who you attempted to mute has the permissions `MANAGE_GUILD` I am not allowed to mute people with such permissions",
        ephemeral: true,
      });
    let muterole = interaction.guild?.roles.cache.find(
      (role) => role.name === "muted"
    );
    if (!muterole) {
      interaction.guild?.roles
        .create({
          name: "muted",
          color: "BLUE",
          permissions: ["VIEW_CHANNEL"],

          reason: "muted role does not exist",
        })
        .catch(console.error);
    }
    user.roles.set([muterole!]);
    const stringedDuration = duration?.toString();
    const embed = new MessageEmbed()
      .setTitle("Mute")
      .setDescription(`${user} was muted by ${interaction.member}`)
      .addField("Reason:", reason ? reason : "Not Specified", true)
      .addField(
        "Duration:",
        stringedDuration == "86400000"
          ? "1 Day"
          : stringedDuration == "36000000"
          ? "10 Hours"
          : stringedDuration === "18000000"
          ? "5 Hours"
          : stringedDuration === "3600000"
          ? "1 Hour"
          : stringedDuration === "600000"
          ? "10 Minutes"
          : stringedDuration === "60000"
          ? "1 Minute"
          : "Infinity(ERR_UNKNOWN)",
        true
      )
      .setColor("RANDOM");
    interaction.reply({ embeds: [embed] });
    setTimeout(function () {
      user.roles.set([memberrole]);
      let embed = new MessageEmbed()
        .setTitle("Unmute")
        .setDescription(
          `${user}'s mute has ended. The mute lasted ${
            stringedDuration == "86400000"
              ? "1 Day"
              : stringedDuration == "36000000"
              ? "10 Hours"
              : stringedDuration === "18000000"
              ? "5 Hours"
              : stringedDuration === "3600000"
              ? "1 Hour"
              : stringedDuration === "600000"
              ? "10 Minutes"
              : stringedDuration === "60000"
              ? "1 Minute"
              : "Infinity(ERR_UNKNOWN)"
          }`
        )
        .setColor("RANDOM");
      interaction.channel?.send({ embeds: [embed] });
    }, duration);
  },
};
