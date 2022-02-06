import countSchema from "../Schemas/countSchema";
import mongo from "../botconfig/mongo";
import { Message } from "discord.js";
async function count(message: Message) {
  try {
    await mongo().then(async () => {
      let countInfo = await countSchema.findOne({ _id: message.guild?.id });
      if (countInfo) {
        const vc = countInfo.voiceChannelID;
        setInterval(function () {
          var memberCount = message.guild?.members.cache.filter(
            (m) => !m.user.bot
          ).size;
          var memberCountChannel = message.guild?.channels.cache.get(vc);
          if (!memberCountChannel) return;
          memberCountChannel.setName(`${memberCount} members`);
        }, 1000);
      }
    });
  } catch (err) {
    require("../handlers/errorHandler");
  }
}

export default count;
