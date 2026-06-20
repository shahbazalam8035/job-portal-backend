// services/candidate.service.js

import { getCandidatesCountRepository, getCandidatesRepository } from "./candidate.repository.js";



export const getCandidatesService = async (query) => {
  const {
    skill,
    experience,
    location,
    page = 1,
    limit = 5,
  } = query;

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
      $options: "i",
    };
  }

  const skip = (Number(page) - 1) * Number(limit);

  const candidates = await getCandidatesRepository(
    filter,
    skip,
    Number(limit)
  );

  const totalCount = await getCandidatesCountRepository(filter);

  return {
    message: candidates.length
      ? "Candidates fetched successfully"
      : "No candidates found",
    page: Number(page),
    limit: Number(limit),
    count: totalCount,
    data: candidates,
  };
};