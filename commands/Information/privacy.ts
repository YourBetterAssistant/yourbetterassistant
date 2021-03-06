import { Client, Message, MessageEmbed } from "discord.js";
module.exports = {
  name: "privacy",
  description: "Privacy Policy",
  category: "Information",
  memberpermissions: "VIEW_CHANNEL",
  cooldown: 0,
  usage: "privacy",
  run: async (client: Client, message: Message) => {
    const embed = new MessageEmbed()
      .setTitle("Privacy Policy")
      .addFields(
        {
          name: "What Data Do We Collect?",
          value:
            "The Data The Bot Collects is only your username and userid we don't collect any other data that includes you. Behind the scenes we also store all messages you send anonymously meaning that your username will not be shown with the message sent. ",
        },
        {
          name: "Why Do You Need This Data?",
          value:
            "We require this data to defer your data from others and to also train out chatbot with conversations",
        },
        {
          name: "How Do You Use This Data?",
          value:
            "We use it for certain commands like levels or richlist and also for training the chatbot which can be toggled on or off in the website, https://yourbetterassistant.me",
        },
        {
          name: "Other then discord or the users of this bot who else do you share the data with?",
          value:
            "We don't share our data with anyone else besides the developers (me) or our end users (for certain commands)",
        },
        {
          name: "How Can users contact you if they have concerns about your bot?",
          value: " Feel free to dm <@827388013062389761> for any concerns",
        },
        {
          name: "If you store data how can users have that data removed?",
          value:
            "To have data removed dm me I'll delete it no questions asked ",
        }
      )
      .setFooter("Subject To Change VALID AS OF: 17/4/2022")
      .setColor("GREYPLE");
    message.channel.send({ embeds: [embed] });
  },
};
