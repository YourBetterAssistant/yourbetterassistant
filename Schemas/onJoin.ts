"use strict";

import mongoose from "mongoose";
const joinroles = new mongoose.Schema({
  guildId: {
    type: String,
    required: true,
    unique: true,
  },
  roleId: {
    type: String,
    required: true,
  },
});

export default mongoose.model<Ijoinroles>("joinroles", joinroles);
interface Ijoinroles extends mongoose.Document {
  guildId: string;
  roleId: string;
}
