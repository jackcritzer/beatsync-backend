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

    console.log(`Secrets loaded successfully DEMO_MODE=${DEMO_MODE}, BUCKET_NAME=${process.env.S3_BUCKET_NAME}`)

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