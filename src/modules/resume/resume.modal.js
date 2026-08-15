// resume.model.js

import mongoose from "mongoose";

const resumeSchema = new mongoose.Schema(
  {
    userId: Number,

    resumeUrl: {
      type: String,
      required: true,
    },
    
    name: {
      type: String,
      trim: true,
    },

    email: {
      type: String,
      trim: true,
      index: true,
    },

    phone: {
      type: String,
      trim: true,
    },

    location: {
      type: String,
      trim: true,
    },

    skills: [
      {
        type: String,
        lowercase: true,
        trim: true,
        index: true, // important for skill search
      },
    ],

    total_experience: {
      type: Number,
      default: 0,
      index: true, // recruiter filters by this
    },

    raw_text: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);
console.log(mongoose.connection.name,"mongoose name")

export const Resume = mongoose.model("Resume", resumeSchema);