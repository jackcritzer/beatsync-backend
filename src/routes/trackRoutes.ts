import express from 'express';
import { s3, uploadTrack, getTracksByGroup, deleteTrack } from '../controllers/trackController';
import authMiddleware from '../middleware/authMiddleware';
import multer from 'multer';
import multerS3 from "multer-s3";
import { DEMO_MODE } from "../config";

export default (bucketName: string) => {
    const router = express.Router();
    if (DEMO_MODE) {
        router.post('/upload', (req, res) => {
            res.json({
                message: "✅ Demo mode: file upload simulated.",
                filename: "demo-track.mp3",
                s3Url: "https://example.com/demo-track.mp3"
            });
        });
        
        router.get('/group/:groupId', (req, res) => {
            res.json([
                { id: 1, title: "Shukran Don", artist: "Mach-Hommy" },
                { id: 2, title: "Wuditlooklike", artist: "Redman" }
            ]);
        });

        router.delete("/:trackId", (req, res) => {
            res.status(200).json({
                message: 'Demo Track deleted successfully'
            });
        });

    } else {
        if (!bucketName) {
            throw new Error('S3_BUCKET_NAME is required when not in DEMO_MODE');
        }

        const upload = multer({
            storage: multerS3({
              s3,
              bucket: bucketName,
              contentType: multerS3.AUTO_CONTENT_TYPE,
              key: function (req, file, cb) {
                  cb(null, `tracks/${Date.now()}-${file.originalname}`);
              },
            })
        });

        router.post("/upload", upload.single("file"), uploadTrack);
        router.get("/group/:groupId", authMiddleware, getTracksByGroup);
        router.delete("/:trackId", authMiddleware, deleteTrack);
    }
  
    return router;
};