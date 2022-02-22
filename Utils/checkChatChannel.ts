import axios from "axios";
import { Message, TextChannel } from "discord.js";
import chatBot from "../Schemas/chatbot";
async function check(message: Message) {
  let check = await chatBot.findOne({ guildID: message.guild?.id });
  if (check) {
    let ch = check.channelID;
    if (message.channel.id === ch) {
      async function urlGet(url: string) {
        let axios = require("axios").default;
        axios
          .get(url)
          .then(function (response: any) {
            // handle success
            message.reply(response.data.message);
          })
          .catch(function (error: any) {
            // handle error
            console.log(error);
          })
          .then(function () {});
      }
      urlGet(
        `https://chatbot.yourbetterassistant.me/?message=${message.content}`
      );
      return;
    }
  }
}
export default check;
