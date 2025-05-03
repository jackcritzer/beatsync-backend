import { Request, Response } from 'express'
import { requireUser } from '../utils/authHelpers'
import prisma from '../config/db'

export const getProfile = async (req: Request, res: Response) => {
    try {
        const { id: userId } = requireUser(req)

        const user = await prisma.user.findUnique({
            where: { id: userId },
            select: {
                id: true,
                email: true,
                name: true,
                createdAt: true,
            }
        })

        if (!user) {
            res.status(404).json({ error: 'User not found' })
            return
        }

        res.json(user)
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: 'Server error' })
    }
}

// export const updateProfile

// export const deleteAccount