import { Message } from "discord.js";
import model from "../Schemas/autoMod";
const badwords = require("badwords/array");
function isUpperCase(str: string) {
  if (
    str.includes("@") ||
    str.includes("<") ||
    str.includes(
      ">" ||
        str.includes("!") ||
        str.includes("%") ||
        str.includes("#") ||
        str.includes("&")
    )
  )
    return false;
  if (str.length < 5) return false;
  else {
    return str === str.toUpperCase();
  }
}

class Model {
  public message: any;
  public client: any;

  constructor(message: Message) {
    this.message = message;
    this.client = message.client;
  }

  async checkProfanity() {
    const message = this.message;
    badwords.forEach((word: string) => {
      if (message.content.includes(word)) {
        const channel = message.channel;
        const author = message.author;
        message.delete();
        channel.send(
          `${message.author}, Strict-Mode is Enabled Please Don't Use That Word Again`
        );
      }
    });
  }
  async allCaps() {
    const message = this.message;
    if (isUpperCase(message.content) === true) {
      return message.channel.send("Stop Spamming Caps!");
    }
  }
}
export default Model;
