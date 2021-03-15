import mongoose from "mongoose";

import { MONGO_URI } from "../constants.js";

export const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
  } catch (error) {
    console.log("Error connecting to MongoDB.", error);
  }
};
