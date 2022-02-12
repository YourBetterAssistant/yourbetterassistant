import { exec } from "child_process";
import { Client, Message, MessageEmbed } from "discord.js";
module.exports = {
  name: "sys-eval",
  description: "OWNER",
  category: "OWNER",
  memberpermissions: ["VIEW_CHANNEL"],
  cooldown: 20,
  usage: "systemeval <eval>",
  run: async (client: Client, message: Message, args: string[]) => {
    if (message.author.id !== "827388013062389761")
      return message.channel.send("You are not the owner of this bot!");
    else
      exec(args.join(" "), (err, stdout, stderr) => {
        const embed = new MessageEmbed()
          .setTitle(`You Executed\`\`\`${args.join(" ")}\`\`\``)
          .setColor("RED");
        if (err) embed.addField("Error", `\`\`\`sh\n${err.stack}\n\`\`\``);
        if (stdout) embed.addField("Out", `\`\`\`sh\n${stdout}\n\`\`\``);
        if (stderr) embed.addField("stderr", `\`\`\`sh\n${stderr}\n\`\`\``);
        message.channel.send({ embeds: [embed] });
      });
  },
};
