require("dotenv").config();
import mongoose from "mongoose";
import { mongoPath } from "./config.json";
import Logger from "../lib/logger";
const logger = new Logger("Utils - MongoDB");
export default async () => {
  await mongoose.connect(mongoPath).catch((err) => {
    logger.error(err);
  });
  return mongoose;
};
