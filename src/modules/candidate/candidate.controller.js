import { Resume } from "../resume/resume.modal.js";

export const getCandidates = async (req, res) => {
  try {
    const { skill, experience, location, limit=5, page=1 } = req.query;

    let filter = {};

    if (skill) {
      const skillsArray = skill
        .split(",")
        .map(item => item.trim().toLowerCase());

      filter.skills = {
        $in: skillsArray,
      };
    }

    if (experience) {
      filter.total_experience = {
        $gte: Number(experience),
      };
    }

    if (location) {
      filter.location = {
        $regex: location,
        $options: 'i',
      };
    }

    const skip = (page - 1) * limit;

    const candidates = await Resume.find(filter).skip(Number(skip)).limit(Number(limit));

    const totalCount = await Resume.countDocuments(filter);    // all candidates count
   
    return res.status(200).json({
      success: true,
      message:candidates.length
        ? "Candidates fetched successfully"
        : "No candidates found",
      page: Number(page),
      limit: Number(limit),
      count: totalCount,
      data: candidates,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};