"use strict";

import { Client, Message } from "discord.js";

import { readdirSync } from "fs";
import Table from "cli-table";
import { command } from "../typings/global";
const table = new Table();
module.exports = async function (client: Client) {
  console.log("Starting Command Handler... \n".cyan.bold);
  table.push(["Command".green.bold, "Description".green.bold]);

  readdirSync("commands/").forEach((dir: string) => {
    const commands = readdirSync(`./dist/commands/${dir}/`).filter((file) =>
      file.endsWith(".js")
    );
    for (const file of commands) {
      const command: command = require(`../commands/${dir}/${file}`);
      const commandName = command.name;
      console.log(file);
      table.push([commandName.toString(), command.description.toString()]);
      client.commands.set(commandName, command);
    }
  });
  console.log(table.toString());
};
// module.exports = (client: Client) => {
//   try {
//     readdirSync("./commands/").forEach((dir: string) => {
//       const commands = readdirSync(`./commands/${dir}/`).filter(
//         (file: string) => file.endsWith(".js")
//       );
//       for (let file of commands) {
//         let pull = require(`../commands/${dir}/${file}`);
//         if (pull.name) {
//           client.commands.set(pull.name, pull);
//           table.addRow(file, "Ready");
//         } else {
//           table.addRow(
//             file,
//             `error->missing a help.name,or help.name is not a string.`
//           );
//           continue;
//         }
//         if (pull.aliases && Array.isArray(pull.aliases))
//           pull.aliases.forEach((alias: string) =>
//             client.aliases.set(alias, pull.name)
//           );
//       }
//     });
//     console.log(table.toString().cyan);
//     const slash = readdirSync("./slash").filter((file: string) =>
//       file.endsWith(".js")
//     );
//     for (let file of slash) {
//       let pull = require(`../slash/${file}`);
//       if (pull.name) {
//         client.interactions.set(pull.name, pull);
//         otherTable.addRow(file, "Ready");
//       } else {
//         table.addRow(file, "error->missing name");
//         continue;
//       }
//     }
//     console.log(otherTable.toString().red);
//   } catch (e: any) {
//     console.log(String(e.stack).bgRed);
//   }
// };

// /** Template by Tomato#6966 | https://github.com/Tomato6966/Discord-Js-Handler-Template */
