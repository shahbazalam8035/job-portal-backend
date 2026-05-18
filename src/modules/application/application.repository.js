import { pgPool } from '../../config/db.js';
import { Resume } from '../resume/resume.modal.js';

export const createApplication = async ({ jobId, userId, resumeId }) => {
    const query = `
    INSERT INTO applications (job_id, user_id, resume_id)
    VALUES ($1, $2, $3)
    RETURNING *;
  `;
    const values = [jobId, userId, resumeId];
    const { rows } = await pgPool.query(query, values);
    return rows[0];
};

// Find resume in MongoDB
export const findResumeByUserId = async (userId) => {
    const resume = await Resume.findOne({ userId });
    return resume

}

// find job by id
export const findJobById = async (jobId) => {
    const { rows} = await pgPool.query("SELECT * FROM jobs WHERE id = $1", [jobId])
    return rows[0];
}