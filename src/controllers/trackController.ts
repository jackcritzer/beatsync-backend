import { Request, Response } from 'express';
import prisma from '../config/db';
import { TrackType } from '@prisma/client';
import { S3Client, DeleteObjectCommand } from '@aws-sdk/client-s3';

// AWS S3 Configuration
export const s3 = new S3Client({
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID as string,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY as string,
    },
    region: process.env.AWS_REGION as string,
});

/**
 * Upload Track (AWS S3 or External Link)
 */
export const uploadTrack = async (req: Request, res: Response) => {
    try {

        console.log("🔍 req.body:", req.body);
        console.log("📁 req.file:", req.file);

        const { title, url, groupId, type } = req.body;
        const userId = (req as any).user.id;

        if (!title || !groupId) {
            res.status(400).json({
                error: 'title and groupId are required'
            });
            return;
        }

        let trackUrl = url;

        if (type === TrackType.FILE && req.file) {
            trackUrl = (req.file as any).location; // AWS S3 URL
        } else if (type === TrackType.LINK && !url) {
            res.status(400).json({
                error: 'URL is required for external links'
            });
            return;
        }

        const track = await prisma.track.create({
            data: {
                title,
                url: trackUrl,
                type,
                uploadedById: userId,
                groupId
            }
        });

        res.status(201).json(track);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: 'Server error'
        });
        return;
    }
}

/**
 * Get Tracks for a Group
 */
export const getTracksByGroup = async (req: Request, res: Response) => {
    try {
        const { groupId } = req.params;

        const tracks = await prisma.track.findMany({
            where: { groupId },
            include: { uploadedBy: true }
        });

        res.status(200).json(tracks);
        return;
    } catch (error) {
        res.status(500).json({
            error: 'Server error'
        });
    }
};

/**
 *  Delete a Track
 */
export const deleteTrack = async (req: Request, res: Response) => {
    try {
        const { trackId } = req.params;
        const userId = (req as any).user.id;

        const track = await prisma.track.findUnique({ where: { id: trackId }});

        if (!track) {
            res.status(404).json({
                error: 'Track not found'
            });
            return;
        }

        // Ensure only uploader can delete
        if (track.uploadedById !== userId) {
            res.status(403).json({
                error: 'Unauthorized'
            });
        }

        // Delete from S3 if it's a file
        if (track.type === TrackType.FILE) {
            const fileKey = track.url.split('/').pop(); // Extract file name from S3 URL
            await s3.send(
                new DeleteObjectCommand({ 
                    Bucket: process.env.S3_BUCKET_NAME as string, 
                    Key: `tracks/${fileKey}`
                })
            );
        }

        // Delete from database
        await prisma.track.delete({ where: { id: trackId }});

        res.status(200).json({
            message: 'Track deleted successfully'
        });
        return;
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: 'Server error'
        })
        return;
    }
}