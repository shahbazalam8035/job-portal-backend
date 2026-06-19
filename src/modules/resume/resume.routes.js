import express from "express";
import {getResumeDetails, uploadResume} from "./resume.controller.js";
import authGuard from "../../middlewares/auth.middleware.js";
import roleGuard from "../../middlewares/role.middleware.js";
import { upload } from "../../middlewares/upload.middleware.js";

const router = express();

router.post("/upload", authGuard, roleGuard("applicant"), upload.single("resume"), uploadResume);
router.get("/:resumeId", authGuard, roleGuard("employer","admin"), getResumeDetails);



export default router;