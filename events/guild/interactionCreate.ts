"use strict";
const rrSchema = require("../../Schemas/rrSchema");
const Discord = require("discord.js");
module.exports = async (client, interaction) => {
  if (interaction.isCommand()) {
    let cmd = client.interactions.get(interaction.commandName);
    if (!cmd) return;
    cmd.run(client, interaction, Discord);
  } else if (interaction.isButton()) {
    if (interaction.guild) {
      const possibleReaction = await rrSchema.findOne({
        guildId: interaction.guild.id,
      });
      if (
        possibleReaction &&
        interaction.message.id === possibleReaction.messageId
      ) {
        if (interaction.customId == possibleReaction.role1.name) {
          interaction.guild.roles.fetch();
          const role = interaction.guild.roles.cache.get(
            possibleReaction.role1.id
          );
          if (interaction.member.roles.cache.get(possibleReaction.role1.id)) {
            interaction.member.roles.remove(role);
            interaction.reply({
              content: `The role ${role} has been removed from you click the button again to get it back`,
              ephemeral: true,
            });
          } else {
            interaction.member.roles.add(role);
            interaction.reply({
              content: `The role ${role} has been added to you click the button again to lose it`,
              ephemeral: true,
            });
          }
        } else if (interaction.customId === possibleReaction.role2.name) {
          interaction.guild.roles.fetch();
          const role = interaction.guild.roles.cache.get(
            possibleReaction.role2.id
          );
          if (interaction.member.roles.cache.get(possibleReaction.role2.id)) {
            interaction.member.roles.remove(role);
            interaction.reply({
              content: `The role ${role} has been removed from you click the button again to get it back`,
              ephemeral: true,
            });
          } else {
            interaction.member.roles.add(role);
            interaction.reply({
              content: `The role ${role} has been added to you click the button again to lose it`,
              ephemeral: true,
            });
          }
        }
      }
    }
  }
};
