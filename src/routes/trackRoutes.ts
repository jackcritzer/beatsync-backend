import express from 'express';
import { s3, uploadTrack, getTracksByGroup, deleteTrack } from '../controllers/trackController';
import authMiddleware from '../middleware/authMiddleware';
import multer from 'multer';
import multerS3 from "multer-s3";

// Create Multer instance
const upload = multer({
    storage: multerS3({
        s3,
        bucket: process.env.S3_BUCKET_NAME as string,
        contentType: multerS3.AUTO_CONTENT_TYPE,
        key: function (req, file, cb) {
            cb(null, `tracks/${Date.now()}-${file.originalname}`);
        },
    }),
});

const router = express.Router();

router.post('/upload', authMiddleware, upload.single('file'), uploadTrack);
router.get("/group/:groupId", authMiddleware, getTracksByGroup);
router.delete("/:trackId", authMiddleware, deleteTrack);

export default router;