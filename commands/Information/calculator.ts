"use strict";

const { Calculator } = require("weky");
module.exports = {
  name: "calculator",
  description: "Spawns Calaculator",
  category: "Information",
  guildOnly: true,
  memberpermissions: "VIEW_CHANNEL",
  cooldown: 5,
  usage: "calculator",
  run: async (client, message) => {
    await Calculator({
      message: message,
      embed: {
        title: "Calculator",
        color: "#7289da",
        timestamp: true,
      },
      disabledQuery: "Calculator is disabled!",
      invalidQuery: "The provided equation is invalid!",
      othersMessage: "Only <@{{author}}> can use the buttons!",
    });
  },
};
