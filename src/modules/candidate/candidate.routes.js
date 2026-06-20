import express from "express"
import authGuard from "../../middlewares/auth.middleware.js";
import roleGuard from "../../middlewares/role.middleware.js";
import { getCandidates } from "./candidate.controller.js";

const router = express();

router.get("/",authGuard,roleGuard("employer"),getCandidates);

export default router