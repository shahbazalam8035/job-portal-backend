import {Resume} from "./resume.modal.js";

export const createResume = async (data)=>{
    return await Resume.create(data);
}

export const getResumeById = async (id) => {
  return await Resume.findById(id);
};