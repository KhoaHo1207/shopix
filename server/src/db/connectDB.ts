import mongoose from "mongoose";
import "dotenv/config";

export async function connectDB() {
  const connn = await mongoose.connect(process.env.MONGO_URI as string);
  console.log(`Connected to MongoDB: ${connn.connection.host}`);
}

export default connectDB;
