/* import express from 'express';
import cors from 'cors';
import authRoutes from './routes/authRoutes';
import groupRoutes from './routes/groupRoutes';
import trackRoutes from './routes/trackRoutes';

import configSecrets from './secrets';

async function initializeApp() {
    await configSecrets();

    const { PrismaClient } = await import("@prisma/client"); // ✅ Load Prisma only after secrets are set

    const app = express();
    app.use(express.json());
    app.use(cors());

    // Authentication routes
    app.use('/api/auth', authRoutes);

    // Group routes
    app.use('/api/groups', groupRoutes);

    // Track routes
    app.use('/api/tracks', trackRoutes);

    console.log(`${process.env.PORT}`)

    const PORT = Number(process.env.PORT) || 5000;
    app.listen(PORT, "0.0.0.0", () => { 
        console.log("Server is running on port 5000 and accessible externally");
    })
}

initializeApp().catch((err) => {
    console.error("Failed to initialize secrets:" , err);
    process.exit(1);
}) */

import express from "express";
import cors from "cors";
import morgan from "morgan";
import { getSSMParameter } from "./secrets";
import { DEMO_MODE } from "./config";

const app = express();
const PORT = process.env.PORT || 3000;

async function start() {
    // Load secrets BEFORE importing routes or initializing anything that uses them
    process.env.PORT = await getSSMParameter("/beatsync/PORT") || "5000";
    process.env.JWT_SECRET = await getSSMParameter("/beatsync/JWT_SECRET");
    process.env.DATABASE_URL = await getSSMParameter("/beatsync/DATABASE_URL");
    process.env.AWS_ACCESS_KEY_ID = await getSSMParameter("/beatsync/AWS_ACCESS_KEY_ID");
    process.env.AWS_SECRET_ACCESS_KEY = await getSSMParameter("/beatsync/AWS_SECRET_ACCESS_KEY");
    process.env.AWS_REGION = await getSSMParameter("/beatsync/AWS_REGION");
    process.env.S3_BUCKET_NAME = await getSSMParameter("/beatsync/S3_BUCKET_NAME");

    console.log(`Secrets loaded successfully`)

    // Now that secrets are loaded, you can import your routes
    const authRoutes = (await import("./routes/authRoutes")).default;
    const groupRoutes = (await import("./routes/groupRoutes")).default;
    const trackRoutes = (await import("./routes/trackRoutes")).default;

    app.use(cors());
    app.use(morgan("dev"));
    app.use(express.json());

    app.use('/api/auth', authRoutes);
    app.use('/api/groups', groupRoutes);
    app.use("/api/tracks", trackRoutes(process.env.S3_BUCKET_NAME!));

    app.listen(PORT, () => {
        console.log(`🚀 Server running on port ${PORT}`);
    });
}

start().catch((err) => {
    console.error("❌ Failed to start app:", err);
});