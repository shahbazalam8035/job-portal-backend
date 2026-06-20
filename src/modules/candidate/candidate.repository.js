// repositories/candidate.repository.js

import { Resume } from "../resume/resume.modal.js";


export const getCandidatesRepository = async (
  filter,
  skip,
  limit
) => {
  return await Resume.find(filter)
    .skip(skip)
    .limit(limit);
};

export const getCandidatesCountRepository = async (
  filter
) => {
  return await Resume.countDocuments(filter);
};