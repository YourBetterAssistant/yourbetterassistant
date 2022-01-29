"use strict";
import mongoose from "mongoose";
const store = new mongoose.Schema({
  id: {
    type: String,
    required: true,
  },
  items: {
    type: Array,
    required: true,
  },
  use: {
    type: String,
    required: true,
  },
});

export default mongoose.model<IStore>("store", store);
interface IStore extends mongoose.Document {
  id: string;
  items: Array<{ name: string; price: string; description: string }>;
  use: string;
}
