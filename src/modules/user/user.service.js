import bcrypt from "bcryptjs";
import { findByEmail,createUer } from "./user.repository.js";
import generateJwtToken from "../../utils/generateJwt.js";

export const registerUser = async ({name , email, password}) => {
    const existing = await findByEmail(email);
    if (existing) throw new Error("User already exists");

    const hashed = await bcrypt.hash(password,10)
    return await createUer({name,email,password: hashed })
}

export const loginUser = async ({email,password})=>{
    const user = await findByEmail(email)
    if (!user){
        throw new Error("User does not exists")
    }
    
    const match = await bcrypt.compare(password,user.password)
    if(!match){
        throw new Error("Invalid Password")
    }

    const token = generateJwtToken(user)
    return {user,token}
}