import { pgPool } from "../../config/db.js";

export const findByEmail = async (email)=>{
    const {rows} = await pgPool.query("SELECT * FROM users WHERE email = $1",
        [email]
    );
    return rows[0]
}

export const createUer = async ({name, email, password})=>{
    const {rows} =await  pgPool.query("INSERT INTO users(name,email,password) VALUES($1, $2, $3) RETURNING *",
        [name, email, password]
    );
    return rows[0]
}