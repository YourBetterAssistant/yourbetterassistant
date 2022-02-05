"use strict";

import mongoose from "mongoose";
const logSchema = new mongoose.Schema({
  _id: {
    type: String,
    required: true,
  },
  channelID: {
    type: String,
    required: true,
  },
});

export default mongoose.model<IlogSchema>("logSchema", logSchema);
interface IlogSchema extends mongoose.Document {
  _id: string;
  channelID: string;
}
