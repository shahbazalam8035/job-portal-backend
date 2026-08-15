import { Resume } from "../resume/resume.modal.js";
import { createJobRepo, getApplicationsByJobId, getApplicationsCountByJob } from "./job.repository.js";

export const createJobServ = async (data, user) => {
  return await createJobRepo({ ...data, created_by: user.id });
};

export const getApplications = async ( jobId,skill,limit,page,) => {
  const offset = (Number(page) - 1) * Number(limit)
  const applications = await getApplicationsByJobId(jobId,limit,offset);
  const totalCount = await getApplicationsCountByJob(jobId);
  const applicantDetails = [];

  console.log(applications,"all applications by jobId")
  for (const app of applications) {
    const resume = await Resume.findById(app.resume_id);
    console.log(resume,"resumes all")
    

      // if (!resume) continue;

      if (
        skill &&
        !resume.skills.some(
          (s) => s.toLowerCase() === skill.toLowerCase()
        )
      ) {
        continue;
      }

    applicantDetails.push({
      ...app,
      user: resume || "Not found with resume id"
    })
  }
  return {applicantDetails,totalCount};
}