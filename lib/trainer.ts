import axios from "axios";
import Logger from "./logger";
const toBeTrained: string[] = [];
const logger = new Logger("Lib - Trainer");
setInterval(async () => {
  await axios.post(
    `https://chatbot.yourbetterassistant.me/train`,
    {
      toBeTrained,
    },
    {
      headers: {
        "User-Agent": "YourBetterAssistant",
      },
    }
  );
  logger.info(`Trained ${toBeTrained.length} messages`);
}, 1000 * 60);
export default function Trainer(message: string) {
  toBeTrained.push(message);
}
