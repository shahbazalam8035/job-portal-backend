import express from "express"
import cors from "cors"
import userRoutes from "./modules/user/user.routes.js"
import resumeRoutes from "./modules/resume/resume.routes.js"
import jobRoutes from "./modules/job/job.routes.js"
import applicationRoutes from "./modules/application/application.routes.js"
import candidateRoutes from "./modules/candidate/candidate.routes.js"


const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/users",userRoutes)
app.use("/api/resume/",resumeRoutes)
app.use("/api/job/",jobRoutes)
app.use("/api/application",applicationRoutes)
app.use("/api/candidates",candidateRoutes)


export default app;