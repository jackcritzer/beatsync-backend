import express from "express"
import cors from "cors"
import morgan from "morgan"
import { getSSMParameter } from "./secrets"

const app = express()
const PORT = process.env.PORT || 3000

async function start() {
    // Load secrets BEFORE importing routes or initializing anything that uses them
    process.env.PORT = await getSSMParameter("/cadence/PORT") || "5000"
    process.env.JWT_SECRET = await getSSMParameter("/cadence/JWT_SECRET")
    process.env.DATABASE_URL = await getSSMParameter("/cadence/DATABASE_URL")
    process.env.AWS_ACCESS_KEY_ID = await getSSMParameter("/cadence/AWS_ACCESS_KEY_ID")
    process.env.AWS_SECRET_ACCESS_KEY = await getSSMParameter("/cadence/AWS_SECRET_ACCESS_KEY")
    process.env.AWS_REGION = await getSSMParameter("/cadence/AWS_REGION")
    process.env.S3_BUCKET_NAME = await getSSMParameter("/cadence/S3_BUCKET_NAME")

    console.log(`Secrets loaded successfully ${process.env.DATABASE_URL}`)

    const authRoutes = (await import("./routes/authRoutes")).default
    const projectRoutes = (await import("./routes/projectRoutes")).default
    const accountRoutes = (await import("./routes/accountRoutes")).default

    app.use(cors())
    app.use(morgan("dev"))
    app.use(express.json())

    // Base Route
    app.get("/", (req, res) => {
        res.send("🎵 Cadence API is up and running! 🎵")
    })

    app.use('/api/auth', authRoutes)
    app.use("/api/projects", projectRoutes)
    app.use("/api/account", accountRoutes)

    app.listen(PORT, () => {
        console.log(`🚀 Server running on port ${PORT}`)
    })
}

start().catch((err) => {
    console.error("❌ Failed to start app:", err)
})