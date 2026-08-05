import { Document } from "mongoose";

interface IDetails {
    title: string;
    organization: string;
    description: string;
    startDate: Date;
    endDate: Date;
}

interface IProfessional extends IDetails {
    responsibilities: string[];
    achievements: string[];
    location: string;
    type: "Full-time" | "Part-time" | "Contract" | "Internship" | "Freelance";
}

interface IAcademic extends IDetails {
    degree: string;
    fieldOfStudy: string;
    result: string;
    location: string;
}

export default interface IExperience extends Document {
    professional: IProfessional[];
    academic: IAcademic[];
}