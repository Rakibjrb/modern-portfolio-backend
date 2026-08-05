import { Schema, model } from "mongoose";
import { IAbout } from "../interfaces/about.interface";

const aboutSchema = new Schema<IAbout>(
    {
        image: {
            type: String,
            required: [true, "Image URL is required"],
        },
        name: {
            type: String,
            required: [true, "Name is required"],
            trim: true,
        },
        designation: {
            type: String,
            required: [true, "Designation is required"],
            trim: true,
        },
        experience: {
            type: Number,
            required: [true, "Experience is required"],
        },
        techstack: {
            type: String,
            required: [true, "Tech stack is required"],
        },
        completedProjects: {
            type: Number,
            required: [true, "Completed projects count is required"],
        },
        currentRole: {
            type: String,
            required: [true, "Current role is required"],
        },
        description: {
            type: String,
            required: [true, "Description is required"],
        },
        quote: {
            type: String,
            required: [true, "Quote is required"],
        },
        cvlink: {
            type: String,
            required: [true, "CV link is required"],
        },
        contacts: {
            phone: {
                type: String,
                required: [true, "Phone is required"],
            },
            email: {
                type: String,
                required: [true, "Email is required"],
            },
        },
        socialsLinks: [
            {
                iconUrl: { type: String, required: true },
                name: { type: String, required: true },
                url: { type: String, required: true },
            },
        ],
        skills: [
            {
                iconUrl: { type: String, required: true },
                name: { type: String, required: true },
            },
        ],
    },
    {
        timestamps: true,
    }
);

export const About = model<IAbout>("About", aboutSchema);
