import prefixSchema from "../Schemas/prefixSchema";
import { clearCache } from "../Utils/prefix-load";
import { Client, CommandInteraction, MessageMentions } from "discord.js";
module.exports = {
  name: "changeprefix",
  description: "Changes The Prefix",
  options: [
    { type: 3, name: "prefix", description: "the prefix", required: true },
  ],
  run: async (client: Client, interaction: CommandInteraction) => {
    const isAdmin: boolean =
      interaction.memberPermissions?.has("ADMINISTRATOR")!;
    const prefix: string = interaction.options.getString("prefix")!;
    if (
      MessageMentions.USERS_PATTERN.test(prefix!) ||
      MessageMentions.ROLES_PATTERN.test(prefix!) ||
      MessageMentions.CHANNELS_PATTERN.test(prefix!)
    ) {
      return interaction.reply("Mentions are not allowed to be prefixes");
    }
    if (isAdmin) {
      if (prefix === "b!") {
        await prefixSchema.deleteOne({ _id: interaction.guild?.id });
        clearCache();
        return interaction.reply("Changed The Prefix To Default");
      } else
        await prefixSchema.findOneAndUpdate(
          { _id: interaction.guild?.id },
          {
            _id: interaction.guild?.id,
            prefix,
          },
          { upsert: true }
        );
      clearCache();
      return interaction.reply(`Changed The Prefix To ${prefix}`);
    } else
      return interaction.reply({
        content: "Invalid Perms, Perms Expected:`MANAGE_GUILD`",
        ephemeral: true,
      });
  },
};
