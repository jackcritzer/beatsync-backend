import dotenv from "dotenv"

dotenv.config()

export const DEMO_MODE = process.env.DEMO_MODE === "true"
