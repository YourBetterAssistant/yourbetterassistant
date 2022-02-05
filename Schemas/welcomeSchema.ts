"use strict";

import mongoose from "mongoose";
const welcomeSchema = new mongoose.Schema({
  _id: {
    type: String,
    required: true,
    unique: true,
  },
  DM: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  channelID: {
    type: String,
    required: true,
  },
});
export default mongoose.model<IwelcomeSchema>("welcomeSchema", welcomeSchema);
interface IwelcomeSchema extends mongoose.Document {
  _id: string;
  DM: string;
  text: string;
  channelID: string;
}
