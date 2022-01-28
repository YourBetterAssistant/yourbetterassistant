const { MessageEmbed } = require("discord.js");
const config = require("../../botconfig/config.json");
const ee = require("../../botconfig/embed.json");
module.exports = {
  name: "help",
  description: "help command for text commands",
  category: "Information",
  guildOnly: true,
  memberpermissions: "VIEW_CHANNEL",
  cooldown: 5,
  usage: "help [command]",
  run: async (client, message, args) => {
    try {
      if (args[0]) {
        const embed = new MessageEmbed();
        const cmd =
          client.commands.get(args[0].toLowerCase()) ||
          client.commands.get(client.aliases.get(args[0].toLowerCase()));

        if (!cmd) {
          embed
            .setColor(ee.wrongcolor)
            .setDescription(
              `No Information found for command **${args[0].toLowerCase()}**`
            );
          return message.reply({ embeds: [embed] });
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
            `\`${client.prefix[message.guild.id] || config.prefix}${
              cmd.usage
            }\``
          );
          embed.setFooter("Syntax: <> = required, [] = optional");
        }
        if (cmd.useage) {
          embed.addField(
            "**Usage**",
            `\`${client.prefix[message.guild.id] || config.prefix}${
              cmd.useaage
            }\``
          );
          embed.addField(
            "Your prefix could have been changed, ping the bot to double check!"
          );
          embed.setFooter("Syntax: <> = required, [] = optional");
        }
        embed.setColor(ee.color);
        return message.reply({ embeds: [embed] });
      } else {
        const embed = new MessageEmbed()
          .setColor(ee.color)
          .setThumbnail(client.user.displayAvatarURL())
          .setTitle("HELP MENU 🔰 Commands")
          .setFooter(
            `To see command descriptions and inforamtion, type: ${
              client.prefix[message.guild.id] || config.prefix
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
        message.reply({ embeds: [embed] });
      }
    } catch (e) {
      console.log(String(e.stack).bgRed);
      let embed = new MessageEmbed()
        .setColor(ee.wrongcolor)
        .setFooter(ee.footertext, ee.footericon)
        .setTitle(`❌ ERROR | An error occurred`)
        .setDescription(`\`\`\`${e.stack}\`\`\``);
      return message.reply({ embeds: [embed] });
    }
  },
};
