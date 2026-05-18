import { basicParse, extractText, parseResumeText } from "../../utils/resumeParser.js";
import createResume from "../resume/resume.repository.js";
import fs from "fs";
import path from "path";

const uploadResume = async (req, res) => {
    
    try {
        if (!req.file) {
            return res.status(400).json({ success:false, message: 'No file uploaded' });
            }   
            
        const rawText = await extractText(req.file)
        const parsedData = basicParse(rawText);       
        const result = await createResume({
             userId: req.user.id,
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

export default uploadResume;