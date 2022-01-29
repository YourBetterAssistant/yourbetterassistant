import { Client, CommandInteraction } from "discord.js";

export default {
  name: "clear",
  description: "Mass Clear Messages",
  options: [
    {
      type: 10,
      name: "limit",
      description: "Number of messages to clear",
      required: true,
    },
  ],
  run: async (client: Client, interaction: CommandInteraction) => {
    if (
      !interaction.member?.permissions.toString().includes("MANAGE_MESSAGES")
    ) {
      return interaction.reply({
        content: "Misisng Perms: `MANAGE_MESSAGES`",
        ephemeral: true,
      });
    }
    const limit = interaction.options.getNumber("limit") as number;
    if (limit > 100)
      return interaction.reply({
        content: "You can't remove more than 100 messages!",
        ephemeral: true,
      });

    if (limit < 1)
      return interaction.reply({
        content: "You have to delete at least one message!",
        ephemeral: true,
      });
    try {
      await interaction.channel?.messages
        .fetch({ limit })
        .then(async (messages) => {
          if (interaction.channel?.type === "DM") return;
          await interaction.channel?.bulkDelete(messages);
        });
    } catch (err) {
      return interaction.reply({
        content: `An Error Occured! These are the possible reasons, \n 1. Message is older than 14 days \n 2. I don't have the permission \`MANAGE_MESSAGES\` \n 3. If those don't work file a bug report in the support server`,
        ephemeral: true,
      });
    }
    interaction.reply({
      content: `Successfully deleted ${limit} messages!`,
      ephemeral: true,
    });
  },
};
