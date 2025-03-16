import express from 'express';
import dotenv from 'dotenv';

dotenv.config();

import cors from 'cors';
import authRoutes from './routes/authRoutes';
import groupRoutes from './routes/groupRoutes';
import trackRoutes from './routes/trackRoutes';

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
});
