import { basicParse, extractText, parseResumeText } from "../../utils/resumeParser.js";
import {createResume,getResumeById} from "../resume/resume.repository.js";
import fs from "fs";
import path from "path";

export const uploadResume = async (req, res) => {
    
    try {
        if (!req.file) {
            return res.status(400).json({ success:false, message: 'No file uploaded' });
            }   
            
        const rawText = await extractText(req.file)
        const parsedData = basicParse(rawText);       
        const result = await createResume({
             userId: req.user.id,
             resumeUrl: req.file.originalname,
             ...parsedData
        })
        res.status(201).json({
            success: true,
            message: "Resume upload successfully",
            data: result
        })
    } catch (error) {
        console.log(error.stack)
        res.status(500).json({
            success:false,
            error: error.message
        })
    }

}

export const getResumeDetails = async (req, res) => {
  try {
    const { resumeId } = req.params;

    const resume = await getResumeById(resumeId);

    if (!resume) {
      return res.status(404).json({
        success:false,
        message: 'Resume not found',
      });
    }

    res.status(200).json(resume);

  } catch (err) {
    res.status(400).json({
      error: err.message,
    });
  }
};