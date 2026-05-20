import { createJobServ, getApplications } from "./job.service.js";

export const createJob = async (req, res) => {
  const job = await createJobServ(req.body, req.user);
  res.status(201).json(job);
};
 
export const getApplicationsForJob = async (req,res)=>{
  const applications = await getApplications(req.params);
  res.status(200).json({success:true, data :applications})
}

