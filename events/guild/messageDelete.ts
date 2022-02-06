import { Message, Client } from "discord.js";

const GhostPing = require("../../Constructors/ghostPing");
const { checkAutoMod } = require("../../Utils/checkAutoMod");
export default async (client: Client, message: Message) => {
  await checkAutoMod(message).then(
    async (found: { strictmode: "true" | "false" }) => {
      console.log(found);
      if (found.strictmode === "true") {
        GhostPing.messageDelete(message);
      } else if (found.strictmode === "false") {
        GhostPing.messageDelete(message);
      }
    }
  );
};
