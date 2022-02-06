"use strict";

import mongoose from "mongoose";
let reqStr = {
  type: String,
  required: true,
};
const rrSchema = new mongoose.Schema({
  guildId: reqStr,
  role1: {
    type: Object,
    required: true,
  },
  role2: {
    type: Object,
    required: true,
  },
  messageId: reqStr,
});

export default mongoose.model<IbuttonRoles>("buttonRoles", rrSchema);
interface IbuttonRoles extends mongoose.Document {
  guildId: string;
  role1: {
    name: string;
    id: string;
  };
  role2: {
    name: string;
    id: string;
  };
  messageId: string;
}
