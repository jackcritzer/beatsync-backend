import express from 'express';
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
})