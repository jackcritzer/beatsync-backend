import { Request, Response, NextFunction } from 'express'
import prisma from '../config/db'
import bcrypt from 'bcryptjs'
import generateToken from '../utils/generateToken'
import normalizeEmail from '../utils/normalizeEmail'

export const registerUser = async (
    req: Request, 
    res: Response, 
    next: NextFunction
): Promise<void> => {
    let { email, password, name } = req.body

    // Check if all fields are provided
    if (!email || !password) {
        res.status(400).json({ message: 'All fields are required' })
        return
    }

    email = normalizeEmail(email)

    try {
        // Check if user already exists
        const existingUser = await prisma.user.findUnique({ where: { email } })
        
        if (existingUser) {
            res.status(400).json({ message: 'User already exists' })
            return
        }

        // Hash the password
        const passwordHash = await bcrypt.hash(password, 10)

        const user = await prisma.user.create({ data: { email, name, passwordHash } })

        // Return user details + token
        res.status(201).json({ user: { id: user.id, email: user.email }, token: generateToken(user.id, user.email) })
    } catch (error) {
        next(error)
    }
}

export const loginUser = async (req: Request, res: Response, next: NextFunction) => {
    let { email, password } = req.body

    // Check if all fields are provided
    if (!email || !password) {
        res.status(400).json({ message: 'All fields are required' })
        return
    }

    email = normalizeEmail(email)

    console.log(email)

    try {
        const user = await prisma.user.findUnique({ where: { email } })
        if (!user) {
            res.status(400).json({ message: 'Invalid email or password' })
            return
        }

        const isMatch = await bcrypt.compare(password, user.passwordHash)
        if (!isMatch) {
            res.status(400).json({ message: 'Invalid email or password' })
            return
        }

        // Return user details + token
        res.status(201).json({ user: { id: user.id, email: user.email }, token: generateToken(user.id, user.email) })
    } catch (error) {
        next(error)
    }
}