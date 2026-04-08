import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

export default async function connectDB() {

    if (!MONGODB_URI) {
        console.warn("MONGODB_URI is not defined. Skipping connection.");
        return;
    }

    if (mongoose.connection.readyState >= 1) return;

    try {
        await mongoose.connect(MONGODB_URI);
        console.log("MongoDB Connected");
    } catch (error) {
        console.error("MongoDB Connection Error:", error);
    }
}