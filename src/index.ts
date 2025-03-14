import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import authRoutes from './routes/authRoutes';
import groupRoutes from './routes/groupRoutes';

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

// Authentication routes
app.use('/api/auth', authRoutes);

// Group routes
app.use('/api/groups', groupRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
