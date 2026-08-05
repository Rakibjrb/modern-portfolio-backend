import { Schema, model } from "mongoose";
import IExperience from "../interfaces/experience.interface";

const professionalSchema = new Schema({
    title: { type: String, required: true },
    organization: { type: String, required: true },
    description: { type: String, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date },
    responsibilities: { type: [String], default: [] },
    achievements: { type: [String], default: [] },
    location: { type: String, required: true },
    type: {
        type: String,
        enum: ["Full-time", "Part-time", "Contract", "Internship", "Freelance"],
        required: true,
    },
});

const academicSchema = new Schema({
    title: { type: String, required: true },
    organization: { type: String, required: true },
    description: { type: String, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date },
    degree: { type: String, required: true },
    fieldOfStudy: { type: String, required: true },
    result: { type: String, required: true },
    location: { type: String, required: true },
});

const experienceSchema = new Schema<IExperience>(
    {
        professional: {
            type: [professionalSchema],
            default: [],
        },
        academic: {
            type: [academicSchema],
            default: [],
        },
    },
    {
        timestamps: true,
    }
);

export const Experience = model<IExperience>("Experience", experienceSchema);
