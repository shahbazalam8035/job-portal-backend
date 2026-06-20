import { Resume } from "../resume/resume.modal.js";
import { getCandidatesService } from "./candidate.service.js";

export const getCandidates = async (req, res) => {
  try {
    const result = await getCandidatesService(req.query);

    return res.status(200).json({
      success: true,
      ...result,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};