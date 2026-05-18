import { createJobRepo } from "./job.repository.js";

export const createJobServ = async (data, user) => {
  return await createJobRepo({ ...data, created_by: user.id });
};