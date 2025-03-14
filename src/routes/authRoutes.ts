import express from 'express';
import { registerUser, loginUser } from '../controllers/authController';
import authMiddleware from '../middleware/authMiddleware';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);

// Protected route (only accessible with a valid token)
router.get('/protected', authMiddleware);

export default router;