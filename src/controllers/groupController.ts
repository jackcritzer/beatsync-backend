import { Request, Response } from 'express';
import prisma from '../config/db';

/**
 * Create a new group
 */
export const createGroup = async (req: Request, res: Response) => {
    try {
        const { name, description } = req.body;
        const userId = (req as any).user.id; // Extract user ID from JWT

        if (!name) {
            res.status(400).json({ error: 'Group name is required.' });
            return;
        }

        const group = await prisma.group.create({
            data: {
                name,
                description,
                users: {
                    create: { userId },
                },
            },
        });

        res.status(201).json(group);
        return;
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
        return;
    }
}

/**
 * Join an existing group
 */
export const joinGroup = async (req: Request, res: Response) => {
    try {
        const { groupId } = req.params;
        const userId = (req as any).user.id;

        const existingGroup = await prisma.group.findUnique({ where: { id: groupId } });
        if (!existingGroup) {
            res.status(404).json({ error: 'Group not found' });
            return;
        }

        await prisma.groupUser.create({
            data: { userId, groupId },
        });

        res.status(200).json({ message: 'Joined group successfully.' });
        return;
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
        return;
    }
}


/**
 * Leave a group
*/
export const leaveGroup = async (req: Request, res: Response) => {
    try {
        const { groupId } = req.params;
        const userId = (req as any).user.id;

        await prisma.groupUser.delete({
            where: { userId_groupId: { userId, groupId }}
        });

        res.status(200).json({ message: 'Left group successfully' });
        return;
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
        return;
    }
}

/**
 * Get all groups
 */
export const getGroups = async (req: Request, res: Response) => {
    try {
        const groups = await prisma.group.findMany({
            include: {
                users: true,
            },
        });

        res.status(200).json(groups);
        return;
    } catch(error) {
        res.status(500).json({ error: 'Server error' });
        return;
    }
}