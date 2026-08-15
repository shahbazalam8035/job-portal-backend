import express from "express";
import authGuard from "../../middlewares/auth.middleware.js";
import roleGuard from "../../middlewares/role.middleware.js";
import { createJob, getAllJobs, getApplicationsForJob } from "./job.controller.js";

const Router = express();
Router.get('/', authGuard, roleGuard('employer', 'admin'), getAllJobs);
Router.post('/create', authGuard, roleGuard('employer', 'admin'), createJob);
Router.get('/:jobId/applicants', authGuard, roleGuard('employer', 'admin'), getApplicationsForJob);

export default Router;