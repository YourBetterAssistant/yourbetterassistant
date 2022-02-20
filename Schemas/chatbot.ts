"use strict";

import mongoose from "mongoose";
const chatBot = new mongoose.Schema({
  guildID: {
    type: String,
    required: true,
  },
  channelID: {
    type: String,
    required: true,
  },
});

export default mongoose.model<Ichatbot>("chatbots", chatBot);
interface Ichatbot {
  guildID: string;
  channelID: string;
}
