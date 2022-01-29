"use strict";

import mongoose from "mongoose";
const serverConfSchema = new mongoose.Schema({
  _id: {
    type: String,
    required: true,
  },
  memberroleID: {
    type: String,
    required: true,
  },
  adminroleID: {
    type: String,
    required: true,
  },
  ownerroleID: {
    type: String,
    required: true,
  },
});

export default mongoose.model<IServerConf>(
  "serverConfSchema",
  serverConfSchema
);
interface IServerConf extends mongoose.Document {
  _id: string;
  memberroleID: string;
  adminroleID: string;
  ownerroleID: string;
}
