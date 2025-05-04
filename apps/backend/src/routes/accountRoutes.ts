import { Router } from 'express'
import { getProfile } from '../controllers/accountController'
import authenticate from '../middleware/authMiddleware'

const router = Router()

router.get("/account", authenticate, getProfile)

export default router