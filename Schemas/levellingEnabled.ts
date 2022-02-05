"use strict";

import mongoose from "mongoose";
const levellingEnabled = new mongoose.Schema({
  guildID: {
    type: String,
    required: true,
  },
  enabled: {
    type: Boolean,
    required: true,
  },
});

export default mongoose.model<IlevellingEnabled>(
  "levellingEnabled",
  levellingEnabled
);
interface IlevellingEnabled extends mongoose.Document {
  guildID: string;
  enabled: boolean;
}
