import { connect } from "mongoose";

const dbConfig = async () => {
  try {
    await connect(process.env.MONGO_URI as string);
    console.log("MongoDB connected");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
};

export { dbConfig };
