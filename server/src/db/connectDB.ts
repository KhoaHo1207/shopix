import "../loadEnv";
import mongoose from "mongoose";

export async function connectDB() {
  const connn = await mongoose.connect(process.env.MONGO_URI as string);
  console.log(`Connected to MongoDB: ${connn.connection.host}`);
}

export default connectDB;
