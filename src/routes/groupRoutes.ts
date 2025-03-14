import express from "express";
import { createGroup, joinGroup, leaveGroup, getGroups } from '../controllers/groupController';
import authMiddleware from "../middleware/authMiddleware";

const router = express.Router();

router.post("/", authMiddleware, createGroup);
router.post("/:groupId/join", authMiddleware, joinGroup);
router.post("/:groupId/leave", authMiddleware, leaveGroup);
router.get("/", authMiddleware, getGroups);

export default router;