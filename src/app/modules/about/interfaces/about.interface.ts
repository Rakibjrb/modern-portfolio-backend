import { Document } from "mongoose";

export interface IAbout extends Document {
    image: string;
    name: string;
    designation: string;
    experience: number;
    techstack: string;
    completedProjects: number;
    currentRole: string;
    description: string;
    quote: string;
    cvlink: string;
    contacts: {
        phone: string;
        email: string;
    }
    socialsLinks: { iconUrl: string; name: string; url: string }[];
}