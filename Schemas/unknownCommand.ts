"use strict";
import mongoose from "mongoose";
const unknownCommand = new mongoose.Schema({
  guildId: {
    type: String,
    required: true,
  },
});

export default mongoose.model<IunknownCommand>(
  "unknownCommand",
  unknownCommand
);
interface IunknownCommand extends mongoose.Document {
  guildId: string;
}
