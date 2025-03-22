import express from 'express';
import { registerUser, loginUser } from '../controllers/authController';
import authMiddleware from '../middleware/authMiddleware';
import { DEMO_MODE } from '../config'; 

const router = express.Router();

if (DEMO_MODE) {
    router.post('/login', (req, res) => {
        res.json({
            token: "demo.jwt.token",
            user: { id: "demo_user", name: "Demo User", email: "demo@example.com" }
        });
    });

    router.post('/register', (req, res) => {
        res.json({ message: "✅ Demo mode: user registered (not really)." });
    });

    router.get('/me', (req, res) => {
        res.json({ id: "demo_user", name: "Demo User", email: "demo@example.com" });
    });
} else {
    router.post('/register', registerUser);
    router.post('/login', loginUser);

    // Protected route (only accessible with a valid token)
    router.get('/protected', authMiddleware);
}



export default router;