import { Document } from "mongoose";

interface IDetails {
  title: string;
  organization: string;
  description: string;
  startDate: Date;
  endDate?: Date;
}

export interface IProfessionalExperience extends IDetails, Document {
  responsibilities: string[];
  achievements: string[];
  location: string;
  type: "Full-time" | "Part-time" | "Contract" | "Internship" | "Freelance";
}

export interface IAcademicExperience extends IDetails, Document {
  degree: string;
  fieldOfStudy: string;
  result: string;
  location: string;
}
