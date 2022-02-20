"use strict";

import { Client, Message } from "discord.js";

import { readdirSync } from "fs";
import Table from "cli-table";
import path from "path";
import { command, interaction } from "../typings/global";
const commandtable = new Table();
const slashtable = new Table();
module.exports = async function (client: Client) {
  console.log("Starting Command Handler... \n".cyan.bold);
  commandtable.push([
    "Command".green.bold,
    "Category".green.bold,
    "Description".green.bold,
  ]);
  slashtable.push(["Slash-Command".red.bold, "Description".red]);
  console.log("Text-Commands".cyan);
  readdirSync("dist/commands/").forEach((dir: string) => {
    const commands = readdirSync(`./dist/commands/${dir}/`).filter((file) =>
      file.endsWith(".js")
    );
    for (const file of commands) {
      const command: command = require(`../commands/${dir}/${file}`);
      const commandName = command.name;
      commandtable.push([
        commandName.toString().blue,
        dir.bgCyan.black,
        command.description.toString().red,
      ]);
      client.commands.set(commandName, command);
      continue;
    }
  });
  console.log(commandtable.toString() + "\n");

  console.log("Slash-Commands".blue);
  const commands = readdirSync("dist/slash");
  for (const file of commands) {
    const command: interaction = require(`../slash/${file}`);
    slashtable.push([command.name.blue, command.description.yellow]);
    client.interactions.set(command.name, command);
  }
  console.log(slashtable.toString());
};

// /** Template by Tomato#6966 | https://github.com/Tomato6966/Discord-Js-Handler-Template */
