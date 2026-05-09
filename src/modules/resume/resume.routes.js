import express from "express";
import uploadResume from "./resume.controller.js";
import authGuard from "../../middlewares/auth.middleware.js";
import roleGuard from "../../middlewares/role.middleware.js";

const router = express();

router.post("/upload", authGuard, roleGuard("applicant"), uploadResume);



export default router;