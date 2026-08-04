import { Schema, model } from "mongoose";
import { IProject } from "../interfaces/project.interface";

const projectSchema = new Schema<IProject>(
    {
        title: {
            type: String,
            required: [true, "Title is required"],
            trim: true,
        },
        slug: {
            type: String,
            required: [true, "Slug is required"],
            unique: true,
            trim: true,
            lowercase: true,
            index: true,
        },
        shortDescription: {
            type: String,
            required: [true, "Short description is required"],
        },
        fullDescription: {
            type: String,
            required: [true, "Full description is required"],
        },
        thumbnail: {
            type: String,
            required: [true, "Thumbnail URL is required"],
        },
        images: {
            type: [String],
            default: [],
        },
        technologies: {
            type: [String],
            default: [],
        },
        url: {
            live: {
                type: String,
                required: [true, "Live URL is required"],
            },
            githubClient: {
                type: String,
                default: "",
            },
            githubServer: {
                type: String,
                default: "",
            },
        },
        category: {
            type: String,
            required: [true, "Category is required"],
            trim: true,
        },
        featured: {
            type: Boolean,
            default: false,
        },
        order: {
            type: Number,
            default: 0,
        },
    },
    {
        timestamps: true,
    }
);

export const Project = model<IProject>("Project", projectSchema);
