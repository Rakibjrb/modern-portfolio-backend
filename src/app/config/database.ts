import mongoose from "mongoose";
import env from "./env";

export const connectDB = async () => {
    if (mongoose.connection.readyState >= 1) {
        return;
    }

    mongoose.set('bufferCommands', false);
    try {
        await mongoose.connect(env.CLUSTER_URL as string, {
            dbName: env.DATABASE_NAME as string,
            maxPoolSize: 10,
            serverSelectionTimeoutMS: 10000,
            socketTimeoutMS: 45000,
        });
        console.log('✅ MongoDB connected successfully');
    } catch (error) {
        console.log('❌ MongoDB connection error', error);
        throw error;
    }
}

export const disconnectDB = async () => {
    try {
        if (mongoose.connection.readyState !== 0) {
            await mongoose.connection.close();
            console.log('🔌 MongoDB connection closed');
        }
    } catch (error) {
        console.error('❌ Error closing MongoDB connection:', error);
    }
};