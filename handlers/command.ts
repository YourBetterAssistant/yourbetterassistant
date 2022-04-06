"use strict";

import { Client, Message } from "discord.js";
import color from "chalk";
import { readdirSync } from "fs";
import Table from "cli-table";
import logger from "../lib/logger";
import { command, interaction } from "../typings/global";
const commandtable = new Table();
const slashtable = new Table();
module.exports = async function (client: Client) {
  const Logger = new logger("Handler - Command");
  Logger.info(color.bold(color.green("Starting Command Handler... \n")));
  commandtable.push([
    color.bold(color.green("Command")),
    color.bold(color.green("Category")),
    color.bold(color.green("Description")),
  ]);
  slashtable.push([
    color.bold(color.red("Slash-Command")),
    color.bold(color.red("Description")),
  ]);
  Logger.log(color.cyan("Text-Commands"));
  readdirSync("dist/commands/").forEach((dir: string) => {
    const commands = readdirSync(`./dist/commands/${dir}/`).filter((file) =>
      file.endsWith(".js")
    );
    for (const file of commands) {
      const command: command = require(`../commands/${dir}/${file}`);
      const commandName = command.name;
      commandtable.push([
        color.blue(commandName.toString()),
        color.bgCyan(dir),
        color.red(command.description.toString()),
      ]);
      client.commands.set(commandName, command);
      continue;
    }
  });
  console.log(commandtable.toString() + "\n");

  Logger.log(color.blue("Slash-Commands"));
  const commands = readdirSync("dist/slash");
  for (const file of commands) {
    const command: interaction = require(`../slash/${file}`);
    slashtable.push([
      color.blue(command.name),
      color.yellow(command.description),
    ]);
    client.interactions.set(command.name, command);
  }
  console.log(slashtable.toString());
};

// /** Template by Tomato#6966 | https://github.com/Tomato6966/Discord-Js-Handler-Template */
