import express from "express";
import { validateRegister } from "./user.validator.js";
import {login, register} from "../user/user.controller.js"
import authGuard from "../../middlewares/auth.middleware.js";

const router = express();

router.post("/register",validateRegister, register)
router.post("/login",login)
router.get("/profile",authGuard,(req,res)=>{res.json({ message: 'Profile data', user: req.user });})

export default router;