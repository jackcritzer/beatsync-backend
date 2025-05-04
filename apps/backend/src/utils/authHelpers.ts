import { Request } from 'express'
import { AuthPayload } from '../types/auth'

export function attachUser(
    req: Request,
    user: AuthPayload
): void {
    (req as Request & { user: AuthPayload }).user = user
}

export function getUserId(req: Request): string | undefined {
    return (req as Request & { user?: AuthPayload }).user?.id
}

export function requireUser(req: Request): AuthPayload {
    const user = (req as Request & { user?: AuthPayload }).user
    if (!user) {
        throw new Error('No user on request. Did you forget to add auth middleware?')
    }
    return user
}