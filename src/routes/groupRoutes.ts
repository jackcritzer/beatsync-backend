import express from "express";
import { createGroup, joinGroup, leaveGroup, getGroups } from '../controllers/groupController';
import authMiddleware from "../middleware/authMiddleware";
import { DEMO_MODE } from '../config';

const router = express.Router();

if (DEMO_MODE) {
    router.get('/', (req, res) => {
      res.json([
        { id: 1, name: "Demo Group", members: ["Demo User"] }
      ]);
    });
  
    router.post("/:groupId/join", (req, res) => {
        res.json({ message: "✅ Successfully joined group." });
    });

    router.post("/:groupId/leave", (req, res) => {
        res.json({ message: "✅ Successfully left group." });
    });

    router.post('/', (req, res) => {
        res.json({ message: "✅ Demo mode: group created." });
    });
} else {
    router.post("/", authMiddleware, createGroup);
    router.post("/:groupId/join", authMiddleware, joinGroup);
    router.post("/:groupId/leave", authMiddleware, leaveGroup);
    router.get("/", authMiddleware, getGroups);
}

export default router;