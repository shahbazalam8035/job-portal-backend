import { pgPool } from "../../config/db.js";

export const createJobRepo = async (data) => {
  const { rows } = await pgPool.query(
    `INSERT INTO jobs(title, description, company, created_by, employer_id)
     VALUES($1,$2,$3,$4,$5) RETURNING *`,
    [data.title, data.description, data.company, data.created_by,data.created_by]
  );
  return rows[0];
};