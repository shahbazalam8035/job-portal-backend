import { Resume } from "../resume/resume.modal.js";
import { createJobRepo, getApplicationsByJobId, getApplicationsCountByJob } from "./job.repository.js";

export const createJobServ = async (data, user) => {
  return await createJobRepo({ ...data, created_by: user.id });
};

export const getApplications = async ( jobId,skill,limit,page,) => {
  console.log(jobId,skill,limit,page,"skillsss")
  const offset = (page - 1) * limit;
  const applications = await getApplicationsByJobId(jobId,limit,offset);
   const totalCount = await getApplicationsCountByJob(jobId);
   console.log(totalCount,"total count-------------------")
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
  return {applicantDetails,totalCount};
}