import {Resume} from "./resume.modal.js";

const createResume = async (data)=>{
    return await Resume.create(data);
}

export default createResume;