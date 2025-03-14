import { Request, Response, NextFunction } from 'express';
import prisma from '../config/db';
import bcrypt from 'bcryptjs';
import generateToken from '../utils/generateToken';

export const registerUser = async (
    req: Request, 
    res: Response, 
    next: NextFunction
): Promise<void> => {
    const { username, email, password } = req.body;

    // Check if all fields are provided
    if (!username || !email || !password) {
        res.status(400).json({ message: 'All fields are required' });
        return;
    }

    try {
        // Check if user already exists
        const existingUser = await prisma.user.findUnique({ 
            where: { email: email.trim().toLowerCase() } 
        });
        
        if (existingUser) {
            res.status(400).json({ message: 'User already exists' });
            return;
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await prisma.user.create({
            data: { username, email, password: hashedPassword },
        });

        // Return user details + token
        res.status(201).json({
            id: user.id,
            username: user.username,
            token: generateToken(user.id),
        });
    } catch (error) {
        next(error);
        //return res.status(500).json({ message: 'Error generating user', error });
    }
}

export const loginUser = async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;

    // Check if all fields are provided
    if (!email || !password) {
        res.status(400).json({ message: 'All fields are required' });
        return;
    }

    try {
        const user = await prisma.user.findUnique({ where: { email: email.trim().toLowerCase() } });
        if (!user) {
            res.status(400).json({ message: 'Invalid credentials' });
            return;
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            res.status(400).json({ message: 'Invalid credentials' });
            return;
        }

        // Return user details + token
        res.json({
            id: user.id,
            username: user.username,
            token: generateToken(user.id),
        });
    } catch (error) {
        next(error);
        //return res.status(500).json({ message: 'Error logging in', error });
    }
};