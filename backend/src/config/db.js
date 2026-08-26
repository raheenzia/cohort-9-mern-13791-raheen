import mongoose from "mongoose";
import logger from "./logger.js";

const connectDB = async () => {
    try{
        if (!process.env.MONGODB_URI) {
            throw new Error("MONGODB_URI is required");
        }
        await mongoose.connect(process.env.MONGODB_URI);
        logger.info("MongoDB connected");
    } catch (error) {
        logger.error(error, "MongoDB connection failed");
        process.exit(1);
    }
};

export default connectDB;