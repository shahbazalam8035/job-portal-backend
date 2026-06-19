import { createJobServ, getApplications } from "./job.service.js";

export const createJob = async (req, res) => {
  const job = await createJobServ(req.body, req.user);
  res.status(201).json(job);
};
 
export const getApplicationsForJob = async (req,res)=>{
  const { jobId } = req.params;
  const { skill } = req.query;
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 5;
  const applications = await getApplications(jobId,skill,limit,page);
  res.status(200).json({success:true,page:page,limit:limit, count:applications.totalCount, data:applications.applicantDetails,})
}

