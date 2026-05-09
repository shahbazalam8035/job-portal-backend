import mongoose from "mongoose";

const resumeSchema = new mongoose.Schema({
    userId: Number,
    name: String,
    email: String,
    phone: Number,
    skills: [String],
    education: [String],
    experience: [String],
    rawText: String,
}, { timestamps: true })

export default mongoose.model("Resume",resumeSchema)