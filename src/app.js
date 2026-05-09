import express from "express"
import cors from "cors"
import userRoutes from "./modules/user/user.routes.js"
import resumeRoutes from "./modules/resume/resume.routes.js"


const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/users",userRoutes)
app.use("/api/resume/",resumeRoutes)


export default app;