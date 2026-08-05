import { Document } from "mongoose";

export interface IProject extends Document {
    title: string;
    slug: string;
    shortDescription: string;
    fullDescription: string;
    thumbnail: string;
    images: string[];
    technologies: string[];
    url: {
        live: string;
        githubClient?: string;
        githubServer?: string;
    }
    category: string;
    featured: boolean;
    order: number;
}