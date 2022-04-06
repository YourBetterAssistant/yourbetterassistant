import { readdirSync } from "fs";
import { Client } from "discord.js";
import Table from "cli-table";
import color from "chalk";
const table = new Table();
table.push([color.redBright("Event"), color.redBright("Loaded")]);
module.exports = function (client: Client) {
  function loadDir(dir: string) {
    const files = readdirSync(`dist/events/${dir}`).filter((file) =>
      file.endsWith(".js")
    );
    for (const file of files) {
      const event = require(`../events/${dir}/${file}`);
      const eventName = file.split(".")[0];
      try {
        client.on(eventName, (...args: any[]) => event(client, ...args));
        table.push([color.green(eventName), color.green("Yes")]);
      } catch (err: any) {
        table.push([
          color.redBright(eventName),
          color.redBright(`${err.stack}`),
        ]);
      }
    }
  }
  ["client", "guild"].forEach((dir) => loadDir(dir));
  console.log(table.toString());
};

// import { Client } from "discord.js";
// import fs from "fs";
// const ascii = require("ascii-table");
// let table = new ascii("Events");
// table.setHeading("Events", "Load status");
// const allevents: any[] = [];
// module.exports = async (client: Client) => {
//   try {
//     const load_dir = (dir: string) => {
//       const event_files = fs
//         .readdirSync(`./events/${dir}`)
//         .filter((file) => file.endsWith(".js"));
//       for (const file of event_files) {
//         const event = require(`../events/${dir}/${file}`);
//         let eventName = file.split(".")[0];
//         allevents.push(eventName);
//         client.on(eventName, event.bind(null, client));
//       }
//     };
//     await ["client", "guild"].forEach((e) => load_dir(e));
//     for (let i = 0; i < allevents.length; i++) {
//       try {
//         table.addRow(allevents[i], "Ready");
//       } catch (e: any) {
//         console.log(String(e.stack).red);
//       }
//     }
//     console.log(table.toString().cyan);
//     try {
//       const stringlength = 69;
//       console.log("\n");
//       console.log(
//         `     ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓`
//           .green.bold
//       );
//       console.log(
//         `     ┃ `.green.bold +
//           " ".repeat(-1 + stringlength - ` ┃ `.length) +
//           "┃".green.bold
//       );
//       console.log(
//         `| Welcome to SERVICE HANDLER!`.green.bold +
//           " ".repeat(
//             -1 +
//               stringlength -
//               ` ┃ `.length -
//               `Welcome to SERVICE HANDLER!`.length
//           ) +
//           "┃".green.bold
//       );
//       console.log(
//         `     ┃ `.green.bold +
//           " ".repeat(-1 + stringlength - ` ┃ `.length) +
//           "┃".green.bold
//       );
//       console.log(
//         `     ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛`
//           .green.bold
//       );
//     } catch {
//       /* */
//     }
//     try {
//       const stringlength2 = 69;
//       console.log("\n");
//       console.log(
//         `     ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓`
//           .yellow.bold
//       );
//       console.log(
//         `     ┃ `.yellow.bold +
//           " ".repeat(-1 + stringlength2 - ` ┃ `.length) +
//           "┃".yellow.bold
//       );
//       console.log(
//         `| Logging into the BOT...`.yellow.bold +
//           " ".repeat(
//             -1 + stringlength2 - ` ┃ `.length - `Logging into the BOT...`.length
//           ) +
//           "┃".yellow.bold
//       );
//       console.log(
//         `     ┃ `.yellow.bold +
//           " ".repeat(-1 + stringlength2 - ` ┃ `.length) +
//           "┃".yellow.bold
//       );
//       console.log(
//         `     ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛`
//           .yellow.bold
//       );
//     } catch {
//       /* */
//     }
//   } catch (e: any) {
//     console.log(String(e.stack).bgRed);
//   }
// };

// /** Template by Tomato#6966 | https://github.com/Tomato6966/Discord-Js-Handler-Template */
