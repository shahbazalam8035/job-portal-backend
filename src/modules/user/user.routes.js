import express from "express";
import { validateRegister } from "./user.validator.js";
import {register} from "../user/user.controller.js"

const router = express();

router.post("/register",validateRegister, register)

export default router;