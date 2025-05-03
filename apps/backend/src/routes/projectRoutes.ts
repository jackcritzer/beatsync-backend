import { Router } from "express"
import { getProjects } from "../controllers/projectController"
import authenticate from "../middleware/authMiddleware"

const router = Router()

router.get("/projects", authenticate, getProjects)

export default router