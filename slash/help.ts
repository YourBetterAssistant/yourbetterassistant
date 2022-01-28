const { MessageEmbed } = require("discord.js");
const config = require("../botconfig/config.json");
const ee = require("../botconfig/embed.json");
module.exports = {
  name: "help",
  description: "Shows All Message Commands",
  options: [
    {
      type: 3,
      name: "command",
      description: "Shows Information Of Specific Command",
    },
  ],
  run: async (client, interaction) => {
    if (!interaction.guild)
      return interaction.reply("Cannot use this command in dms");
    const command = interaction.options.getString("command");
    try {
      if (command) {
        const embed = new MessageEmbed();
        const cmd =
          client.commands.get(command.toLowerCase()) ||
          client.commands.get(client.aliases.get(command.toLowerCase()));
        if (!cmd) {
          embed
            .setColor(ee.wrongcolor)
            .setDescription(
              `No Information found for command **${command.toLowerCase()}**`
            );
          return interaction.reply({ embeds: [embed] });
        }
        if (cmd.name) embed.addField("**Command :**", `\`${cmd.name}\``);
        if (cmd.name)
          embed.setTitle(`Detailed Information about:\`${cmd.name}\``);
        if (cmd.description)
          embed.addField("**Description**", `\`${cmd.description}\``);
        if (cmd.aliases)
          embed.addField(
            "**Aliases**",
            `\`${cmd.aliases.map((a) => `${a}`).join("`, `")}\``
          );
        if (cmd.cooldown)
          embed.addField("**Cooldown**", `\`${cmd.cooldown} Seconds\``);
        else
          embed.addField(
            "**Cooldown**",
            `\`${config.defaultCommandCooldown}\``
          );
        if (cmd.usage) {
          embed.addField(
            "**Usage**",
            `\`${client.prefix[interaction.guild.id] || config.prefix}${
              cmd.usage
            }\``
          );
          embed.setFooter("Syntax: <> = required, [] = optional");
        }
        if (cmd.useage) {
          embed.addField(
            "**Usage**",
            `\`${client.prefix[interaction.guild.id] || config.prefix}${
              cmd.useage
            }\``
          );
          embed.addField(
            "Your prefix could have been changed, ping the bot to double check!"
          );
          embed.setFooter("Syntax: <> = required, [] = optional");
        }
        embed.setColor(ee.color);
        return interaction.reply({ embeds: [embed] });
      } else {
        const embed = new MessageEmbed()
          .setColor(ee.color)
          .setThumbnail(client.user.displayAvatarURL())
          .setTitle("HELP MENU 🔰 Commands")
          .setFooter(
            `To see command descriptions and inforamtion, type: ${
              client.prefix[interaction.guild.id] || config.prefix
            }help [CMD NAME]`,
            client.user.displayAvatarURL()
          );
        const commands = (category) => {
          return client.commands
            .filter((cmd) => cmd.category === category)
            .map((cmd) => `\`${cmd.name}\``);
        };
        try {
          for (let i = 0; i < client.categories.length; i += 1) {
            const current = client.categories[i];
            const items = commands(current);
            const n = 3;
            const result = [[], [], []];
            const wordsPerLine = Math.ceil(items.length / 3);
            for (let line = 0; line < n; line++) {
              for (let i = 0; i < wordsPerLine; i++) {
                const value = items[i + line * wordsPerLine];
                if (!value) continue;
                result[line].push(value);
              }
            }
            embed.addField(
              `**${current.toUpperCase()} [${items.length}]**`,
              `> ${result[0].join("\n> ")}`,
              true
            );
            embed.addField(
              `\u200b`,
              `${result[1].join("\n") ? result[1].join("\n") : "\u200b"}`,
              true
            );
            embed.addField(
              `\u200b`,
              `${result[2].join("\n") ? result[2].join("\n") : "\u200b"}`,
              true
            );
          }
        } catch (e) {
          console.log(String(e.stack).red);
        }
        interaction.reply({ embeds: [embed] });
      }
    } catch (e) {
      console.log(String(e.stack).bgRed);
      let embed = new MessageEmbed()
        .setColor(ee.wrongcolor)
        .setFooter(ee.footertext, ee.footericon)
        .setTitle(`❌ ERROR | An error occurred`)
        .setDescription(`\`\`\`${e.stack}\`\`\``);
      return interaction.reply({ embeds: [embed], ephemeral: true });
    }
  },
};
