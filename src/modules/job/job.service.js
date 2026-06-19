import { Resume } from "../resume/resume.modal.js";
import { createJobRepo, getApplicationsByJobId } from "./job.repository.js";

export const createJobServ = async (data, user) => {
  return await createJobRepo({ ...data, created_by: user.id });
};

export const getApplications = async ( jobId,skill ) => {
  console.log(jobId,skill,"skillsss")
  const applications = await getApplicationsByJobId(jobId);
  const applicantDetails = [];

  for (const app of applications) {
    const resume = await Resume.findById(app.resume_id);

      if (!resume) continue;
      
      if (
        skill &&
        !resume.skills.some(
          (s) => s.toLowerCase() === skill.toLowerCase()
        )
      ) {
        continue;
      }

    applicantDetails.push({
      applied_at: app.applied_at,
      user: resume
    })
  }
  return applicantDetails;
}