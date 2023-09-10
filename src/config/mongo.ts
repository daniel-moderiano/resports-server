import mongoose from "mongoose";

export const connectDb = async () => {
  try {
    console.log("Connecting to mongo...");
    const mongoUri: string = process.env.MONGO_URI || "";
    await mongoose.connect(mongoUri);
    console.log("Successfully connected to MongoDB");
  } catch (error) {
    if (error instanceof Error) {
      // type guard
      console.error(`Error: ${error.message}`);
      throw new Error(error.message);
    } else {
      console.log("Unexpected error type encountered: ", error);
    }
  }
};
