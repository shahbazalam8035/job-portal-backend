import { createJobServ } from "./job.service.js";

export const createJob = async (req, res) => {
  const job = await createJobServ(req.body, req.user);
  res.status(201).json(job);
};

