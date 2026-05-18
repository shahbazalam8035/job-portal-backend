import express from "express";
import authGuard from "../../middlewares/auth.middleware.js";
import roleGuard from "../../middlewares/role.middleware.js";
import { applyJob } from "./application.controller.js";

const Router = express();

Router.post(
  "/apply/:jobId",
  authGuard,
  roleGuard('applicant'),
  applyJob
);

export default Router;