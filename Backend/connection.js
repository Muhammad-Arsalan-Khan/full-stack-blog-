import mongoose from "mongoose";
export async function connectMongoDB() {
  try {
    return await mongoose.connect(process.env.MONGO_URL);
  } catch (error) {
    console.error("MongoDB connection error:", error);
    throw error; // Re-throw the error to handle it in the calling function
  }
}
