import Levels from "discord-xp";
import { Message } from "discord.js";
async function level(message: Message) {
  if (message.author.bot) return;
  if (message.guild) return;
  const randomAmountOfXp = Math.floor(Math.random() * 29 + 1);
  let hasLeveledUp = await Levels.appendXp(
    message.author.id,
    message.guildId!,
    randomAmountOfXp
  );
  if (!hasLeveledUp) return;
  const user = await Levels.fetch(message.author.id, message.guildId!);
  message.channel.send(
    `${message.author}, congratulations! You have leveled up to **${user.level}**. :tada:`
  );
}
export default level;
