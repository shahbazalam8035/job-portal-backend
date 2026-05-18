import express from "express";
import authGuard from "../../middlewares/auth.middleware.js";
import roleGuard from "../../middlewares/role.middleware.js";
import { createJob } from "./job.controller.js";

const Router = express();
Router.post(
    '/create',
    authGuard,
    roleGuard('employer', 'admin'),
    createJob
);

export default Router;