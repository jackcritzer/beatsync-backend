import jwt from 'jsonwebtoken'

const generateToken = (id: string, normalizedEmail: string) => {
    return jwt.sign({ id, email: normalizedEmail }, process.env.JWT_SECRET!, { expiresIn: '30d' })
}

export default generateToken