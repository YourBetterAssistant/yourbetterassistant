"use strict";

import Discord, { Client, Message } from "discord.js";
import fetch from "node-fetch";
//@ts-check
interface Image_Results {
  _type: "Images";
  readLink: string;
  webSearchUrl: string;
  queryContext: Object;
  totalEstimatedMatches: number;
  nextOffset: number;
  currentOffset: number;
  value: {
    webSearchUrl: string;
    name: string;
    thumbnailUrl: string;
    datePublished: string;
    isFamilyFriendly: boolean;
    contentUrl: string;
    hostPageUrl: string;
    contentSize: string;
    encodingFormat: string;
    hostPageDisplayUrl: string;
    width: number;
    height: number;
    thumbnail: {
      width: number;
      height: number;
    };
    imageInsightsToken: string;
    insightsMetadata: {
      shoppingSourcesCount: number;
      recipeSourcesCount: number;
      pagesIncludingCount: number;
      availableSizesCount: number;
    };
    imageId: string;
    accentColor: string;
  }[];
  queryExpansions: Object[];
  pivotSuggestions: Object[];
  relatedSearches: Object[];
  errors?: {
    code: string;
    subCode: string;
    message: string;
    moreDetails: string;
  }[];
}
module.exports = {
  name: "image",
  description: "displays an image searched from the web",
  category: "Fun",
  memberpermissions: ["VIEW_CHANNEL", "ATTACH_FILES"],
  cooldown: 10,
  usage: "image <query>",
  run: async (client: Client, message: Message, args: string[]) => {
    const image_query = args.join(" ");
    if (!image_query) return message.channel.send("Query Is Not Specified");
    message.channel.send("Searching ...");

    const image_results: Image_Results = (await (
      await fetch(
        `https://api.bing.microsoft.com/v7.0/images/search?q=${image_query}&safeSearch=Strict`,
        {
          method: "GET",
          headers: {
            "Ocp-Apim-Subscription-Key": process.env.BINGAPIKEY,
            Accept: "application/json",
          },
        }
      )
    ).json()) as Image_Results;
    const BestImage = returnAppropriateImage(image_results);
    if (BestImage === undefined)
      return message.channel.send("No suitable image found");
    let embed = new Discord.MessageEmbed()
      .setTitle(BestImage.name)
      .setURL(BestImage.contentUrl)
      .setImage(BestImage.thumbnailUrl);

    message.channel.send({ embeds: [embed] });
  },
};
function returnAppropriateImage(image_results: Image_Results) {
  for (const image of image_results.value) {
    if (image.isFamilyFriendly) {
      return image;
    } else {
      continue;
    }
  }
}
