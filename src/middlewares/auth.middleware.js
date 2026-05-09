import jwt from "jsonwebtoken";

const authGuard = async (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
       return res.status(401).json({ message: 'No token' });
    }

    try {     
        console.log(process.env.SECRET_KEY)
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next()
    } catch {
        res.status(400).json({
            success:false,
            message:"Invalid token"
        })
    }

};

export default authGuard;
