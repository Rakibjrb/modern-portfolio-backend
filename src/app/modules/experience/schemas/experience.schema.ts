import { Schema, model } from "mongoose";
import {
  IAcademicExperience,
  IProfessionalExperience,
} from "../interfaces/experience.interface";

const professionalExperienceSchema = new Schema<IProfessionalExperience>(
  {
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
  },
  {
    timestamps: true,
  },
);

const academicExperienceSchema = new Schema<IAcademicExperience>(
  {
    title: { type: String, required: true },
    organization: { type: String, required: true },
    description: { type: String, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date },
    degree: { type: String, required: true },
    fieldOfStudy: { type: String, required: true },
    result: { type: String, required: true },
    location: { type: String, required: true },
  },
  {
    timestamps: true,
  },
);

export const ProfessionalExperience = model<IProfessionalExperience>(
  "ProfessionalExperience",
  professionalExperienceSchema,
);

export const AcademicExperience = model<IAcademicExperience>(
  "AcademicExperience",
  academicExperienceSchema,
);
