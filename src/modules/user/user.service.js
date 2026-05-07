import bcrypt from "bcryptjs";
import { findByEmail,createUer } from "./user.repository.js";

export const registerUser = async ({name , email, password}) => {
    const existing = await findByEmail(email);
    if (existing) throw new Error("User already exists");

    const hashedPassword = await bcrypt.hash(password,10)
    return await createUer({name,email,hashedPassword})
}