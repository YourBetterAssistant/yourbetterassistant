import workSchema from "./Schemas/workSchema";
import mongo from "./botconfig/mongo";
import errHandler from "./handlers/errorHandler";
import { Message } from "discord.js";
/**
 * @param content what the message is
 * @param mention type in true or false this determines if you are pinging the member or not
 * @param message The message paramater
 * */
export function reply(content: string, mention: boolean, message: Message) {
  message.reply({
    content: content,
    allowedMentions: { repliedUser: mention },
  });
}

/**
 * @param msg message
 * @param j job
 * */
export async function hiremongo(msg: Message, j: string) {
  await mongo().then(async () => {
    try {
      await workSchema.findOneAndUpdate(
        {
          userID: msg.author.id,
        },
        {
          userID: msg.author.id,
          job: j,
        },
        { upsert: true }
      );
      msg.channel.send(`Your job is now ${j}`);
    } catch (err: any) {
      errHandler(err, msg);
    }
  });
}
