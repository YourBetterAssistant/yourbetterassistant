//Importing all needed Commands
import Discord from "discord.js"; //this is the official discord.js wrapper for the Discord Api, which we use!
require("dotenv").config();
import { Node } from "lavaclient";
import Logger from "./lib/logger";
require("@weky/inlinereply");
let token = process.env.TOKEN;
import fs from "fs"; //this package is for reading files and getting their inputs
//Creating the Discord.js Client for This Bot with some default settings ;) and with partials, so you can fetch OLD messages
const client = new Discord.Client({
  partials: ["USER", "CHANNEL", "GUILD_MEMBER", "MESSAGE", "REACTION"],
  intents:
    /*["GUILDS", "GUILD_MESSAGES",'GUILD_MESSAGE_REACTIONS', 'GUILD_VOICE_STATES', 'GUILD_PRESENCES', 'GUILD_MEMBERS', 'GUILD_BANS', 'GUILD_INVITES']*/ [
      "GUILDS",
      "GUILD_MEMBERS",
      "GUILD_BANS",
      "GUILD_INTEGRATIONS",
      "GUILD_WEBHOOKS",
      "GUILD_INVITES",
      "GUILD_VOICE_STATES",
      "GUILD_PRESENCES",
      "GUILD_MESSAGES",
      "GUILD_MESSAGE_REACTIONS",
      "GUILD_MESSAGE_TYPING",
      "DIRECT_MESSAGES",
      "DIRECT_MESSAGE_REACTIONS",
      "DIRECT_MESSAGE_TYPING",
    ],
});

const clientId =
  process.env.NODE_ENV === "testing"
    ? "858606774658924555"
    : "862143828920369172";
const info = { host: "10.23.86.27", port: 2333, password: "lavalink" };
const lavalink = new Node({
  connection: info,
  sendGatewayPayload: (id, payload) =>
    client.guilds.cache.get(id)?.shard?.send(payload),
});
lavalink.connect(clientId);
lavalink.once("connect", () => {
  logger.log("Lavalink Connected!");
});
//Client variables to use everywhere
const logger = new Logger("main");
client.lavalink = lavalink;
client.queue = new Map();
client.commands = new Discord.Collection(); //an collection (like a digital map(database)) for all your commands
client.aliases = new Discord.Collection(); //an collection for all your command-aliases
client.categories = fs.readdirSync("./commands/"); //categories
client.cooldowns = new Discord.Collection(); //an collection for cooldown commands of each user
client.interactions = new Discord.Collection();
client.Token = token;
//Loading files, with the client variable like Command Handler, Event Handler, ...
["events", "command"].forEach(async (handler) => {
  await require(`./handlers/${handler}`)(client);
});

client.ws.on(
  "VOICE_STATE_UPDATE",
  async (data) => await lavalink.handleVoiceUpdate(data)
);
client.ws.on(
  "VOICE_SERVER_UPDATE",
  async (data) => await lavalink.handleVoiceUpdate(data)
);
client.login(token);
/** Template by Tomato#6966 | https://github.com/Tomato6966/Discord-Js-Handler-Template */
