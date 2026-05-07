import { registerUser } from "./user.service.js";

export const register = async (req, res)=>{
try {
    const user = await registerUser(req.body)
    res.status(401).json({
        success:true,
        message:"User registered successfully",
        data : user,
    })
} catch (error) {
    res.status(400).json({
        success: false,
        message: error.message
    })
}
}