import { Resume } from "../resume/resume.modal.js";
import { createJobRepo, getApplicationsByJobId } from "./job.repository.js";

export const createJobServ = async (data, user) => {
  return await createJobRepo({ ...data, created_by: user.id });
};

export const getApplications = async ({ jobId }) => {
  const applications = await getApplicationsByJobId(jobId);
  const applicantDetails = [];

  for (const app of applications) {
    const resume = await Resume.findById(app.resume_id);
    applicantDetails.push({
      applied_at: app.applied_at,
      user: resume
    })
  }
  return applicantDetails;
}