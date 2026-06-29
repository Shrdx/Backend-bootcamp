import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"

const app = express()

//basic configurations
app.use(express.json({ limit: "16kb" }))
app.use(express.urlencoded({ extended: true, limit: "16kb" }))
app.use(express.static("public"))
app.use(cookieParser())

//CORS configuration
app.use(cors({
  origin: process.env.CORS_ORIGIN?.split(",") || "http://localhost:5173",
  credentials: true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}))

//import the routes
import healthcheckRouter from "./routes/healthcheck.router.js"
import authRouter from "./routes/auth_routes.js"
import projectRouter from "./routes/project.routes.js"
import taskrouter from "./routes/tasks.routes.js"
import noterouter from "./routes/notes.routes.js"

app.use("/api/v1/healthcheck", healthcheckRouter)
app.use("/api/v1/auth", authRouter)
app.use("/api/v1/projects", projectRouter)
app.use("/api/v1/tasks", taskrouter)
app.use("/api/v1/notes", noterouter)


app.get('/', (req, res) => {
  res.send('Hello World!')
})

export default app;