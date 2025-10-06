import express from "express"
import authRoutes from "./routes/auth"
import projectRoutes from "./routes/projects"
import categoryRoutes from "./routes/categories"

const app = express()

// Routes
app.use("/api/auth", authRoutes)
app.use("/api/projects", projectRoutes)
app.use("/api/categories", categoryRoutes)
