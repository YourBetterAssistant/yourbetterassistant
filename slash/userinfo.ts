import {
  Client,
  CommandInteraction,
  GuildMember,
  MessageEmbed,
  UserFlagsString,
} from "discord.js";
module.exports = {
  name: "userinfo",
  description: "Shows Information Of A Member In The Server",
  options: [{ type: 6, name: "user", description: "The User", required: true }],
  run: async (client: Client, interaction: CommandInteraction) => {
    const user = interaction.options.getUser("user");

    const member = interaction.inCachedGuild()
      ? interaction.options.getMember("user")
      : null;

    const flags = user?.flags?.toArray();
    const flagEmojis: { [key: string]: string } = {
      HOUSE_BRAVERY: "<:hypebravery:909007331688321036>",
      PARTNERED_SERVER_OWNER: "<:partner:882895897321693194>",
      HYPESQUAD_EVENTS: "<:hypesquademploy:909006344445644830>",
      BUG_HUNTER_LEVEL_1: "<:BugHunter:909007077580632064>",
      HOUSE_BRILLIANCE: "<:hypebrilliance:909007529810464808>",
      HOUSE_BALANCE: "<:hypebalance:909007655962570752>",
      EARLY_SUPPORTER: "<:earlysupport:909007830919553025>",
      TEAM_USER: "TEAM_USER",
      BUGHUNTER_LEVEL_2: "<:Bug_buster_badge:909008807630356491> ",
      VERIFIED_BOT: "<:verified:909009092448768081>",
      EARLY_VERIFIED_BOT_DEVELOPER: "<:earlybotdev:909009315308908554>",
      DISCORD_CERTIFIED_MODERATOR: "<:certmod:909009568745525268> ",
    };
    const embed = new MessageEmbed()
      .setTitle(`${user?.tag}'s Info`)
      .addField(
        "Joined Server",
        `<t:${Math.floor(
          member?.joinedTimestamp ? member?.joinedTimestamp : 1000 / 1000
        )}:R>`,
        true
      )
      .addField(
        "Account Created",
        `<t:${Math.floor(
          user?.createdTimestamp ? user?.createdTimestamp : 1000 / 1000
        )}:R>`,
        true
      );
    member?.premiumSinceTimestamp
      ? embed.addField(
          "Boosting Since",
          `<t:${Math.floor(member?.premiumSinceTimestamp / 1000)}:R>`,
          true
        )
      : null;
    const flag = flags
      ? flags.length < 1
        ? "NONE"
        : flags
            .map((e: string) => flagEmojis[e])
            .toString()
            .replace(/,/g, ", ")
      : null;
    embed
      .setColor("LIGHT_GREY")
      .addField(
        "Has `MANAGE_GUILD`",
        `\`${(Number(member?.permissions.bitfield) & 0x20) == 0x20}\``,
        true
      )
      .addField("Bot?", `\`${user?.bot.toString()}\``, true)
      .addField("Badges", `${flag}`, false)
      .addField(
        "Roles",
        member
          ? member.roles.cache.toJSON().toString().replace(/,/g, "\n")
          : "None"
      )
      .setThumbnail(user ? user.displayAvatarURL({ size: 2048 }) : "");

    interaction.reply({ embeds: [embed] });
  },
};
