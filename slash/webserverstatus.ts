import { Client, CommandInteraction } from "discord.js";
import https from "https";
export default {
  name: "webserverstatus",
  description: "Shows Status of https://yourbetterassistant.me",
  run: async (client: Client, interaction: CommandInteraction) => {
    try {
      interaction.deferReply();
      https.get({ host: "yourbetterassistant.me" }, function (res) {
        if (res.statusCode === 200)
          return interaction.editReply("The Webserver Returned A 200 OK!");
        else
          interaction.editReply(
            "The Webserver Returned a " +
              res.statusCode +
              " " +
              res.statusMessage
          );
        interaction.followUp(
          "I don't think that is good I will send a bug report on behalf of you"
        );
        const fChannel = client.channels.cache.get("897048482366521436");

        return fChannel?.isText()
          ? fChannel.send(
              `<@!827388013062389761> https://yourbetterassistant.me returned a ${res.statusCode} ${res.statusMessage}`
            )
          : null;
      });
    } catch (err) {
      interaction.editReply(
        "An Error Occured While Pinging The Webserver A bug report will be sent"
      );
      const fChannel = client.channels.cache.get("897048482366521436");
      return fChannel?.isText()
        ? fChannel.send(
            `<@!827388013062389761> https://yourbetterassistant.me returned an unknown error this error occured while running \`webserverstatus.js\``
          )
        : null;
    }
  },
};
