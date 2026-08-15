import { createApplication, findJobById, findResumeByUserId } from "./application.repository.js";

export const applyJob = async (req,res)=>{
try {
    const { jobId } = req.params;
    const Job_Id = Number(jobId);
    const userId = req.user.id;

    const job = await findJobById(Job_Id);

    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found"
      });
    }

    const resume = await findResumeByUserId(userId)

    if(!resume){
        return res.status(400).json({success:false,message: "Please upload resume"})
    }

    // Insert into Postgres
    const applicant = await createApplication({
      jobId,
      userId,
      resumeId: resume._id.toString()
    });

    res.status(201).json({status:true,message:"Applied Successfully",data:applicant})

} catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server error"
    });
}
}