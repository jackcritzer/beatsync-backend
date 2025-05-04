import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import { attachUser } from '../utils/authHelpers'

const authenticate = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization
    if (!authHeader?.startsWith('Bearer ')) {
        res.status(401).json({ error: 'Missing or invalid token' })
        return
    }
  
    const token = authHeader.split(' ')[1]
  
    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET!) as { id: string, email: string }

        attachUser(req, payload)

        next()
    } catch {
        res.status(403).json({ error: 'Invalid or expired token' })
        return
    }
}

export default authenticate