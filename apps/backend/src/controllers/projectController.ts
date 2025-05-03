import { Request, Response } from 'express'
import { requireUser } from '../utils/authHelpers'
import prisma from '../config/db'

/**
 * Get all user's projects
 * Route: /api/projects
 */
export const getProjects = async (req: Request, res: Response) => {
    try {
        const { id: userId } = requireUser(req)

        const projects = await prisma.project.findMany({
            where: {
                OR: [
                    { ownerId: userId },
                    {
                        collaborators: {
                            some: { userId: userId }
                        }
                    }
                ]
            },
            include: {
                owner: true,
                collaborators: { include: { user: true} },
                credits: { include: { user: true } },
                comments: { include: { author: true }},
            }
        })

        res.json(projects)
    } catch (err) {
        console.error(err)
        res.status(500).json({ error: 'Something went wrong.' })
    }
}