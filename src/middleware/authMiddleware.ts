import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export interface AuthRequest extends Request {
    user?: { id: string };
}

const authMiddleware = (req: AuthRequest, res: Response, next: NextFunction) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
        res.status(401).json({ message: 'Unauthorized' });
        return;
    }

    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET!) as { id: string };
        req.user = verified;
        next();
        //res.json({ message: 'Access granted', user: req.user });
    } catch (error) {
        res.status(401).json({ message: 'Invalid token' });
    }
}

export default authMiddleware;