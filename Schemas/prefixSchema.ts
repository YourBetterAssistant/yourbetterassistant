"use strict";

import mongoose from "mongoose";
const commandPrefixSchema = new mongoose.Schema({
  _id: {
    type: String,
    required: true,
  },
  prefix: {
    type: String,
    required: true,
  },
});

const PrefixSchema = mongoose.model<IprefixSchema>(
  "guild-prefixes",
  commandPrefixSchema
);
export default PrefixSchema;
interface IprefixSchema extends mongoose.Document {
  _id: string;
  prefix: string;
}
