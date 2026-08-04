import { Server } from "http";
import app from "./app";
import env from "./app/config/env";
import { connectDB, disconnectDB } from "./app/config/database";

let server: Server;

const main = async () => {
    try {
        await connectDB();
        server = app.listen(env.PORT, () => {
            console.log(`🚀 Server is running on port ${env.PORT}`);
        });

    } catch (error) {
        console.error('❌ Server failed to start:', error);
    }
}

main();

const gracefulShutdown = async () => {
    console.log('🛑 Shutting down...');
    await disconnectDB();
    console.log('🔌 MongoDB connection closed');
    if (server) {
        server.close(() => {
            console.log('Server closed');
            process.exit(0);
        });
    } else {
        process.exit(1)
    }
}

process.on("SIGTERM", gracefulShutdown);
process.on("SIGINT", gracefulShutdown);
process.on("unhandledRejection", (err) => {
    console.error("❌ Unhandled Rejection:", err);
    gracefulShutdown();
})
process.on("uncaughtException", (err) => {
    console.error("❌ Uncaught Exception:", err);
    gracefulShutdown();
});