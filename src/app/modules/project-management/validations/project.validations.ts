import { z } from "zod";

const createProjectReq = z.object({
    body: z.object({
        title: z.string({ required_error: "Title is required" }),
        slug: z.string().optional(),
        shortDescription: z.string({ required_error: "Short description is required" }),
        fullDescription: z.string({ required_error: "Full description is required" }),
        thumbnail: z.string({ required_error: "Thumbnail URL is required" }),
        images: z.array(z.string()).optional(),
        technologies: z.array(z.string()).optional(),
        url: z.object({
            live: z.string({ required_error: "Live URL is required" }),
            githubClient: z.string().optional(),
            githubServer: z.string().optional(),
        }),
        category: z.string({ required_error: "Category is required" }),
        featured: z.boolean().optional(),
        order: z.number().optional(),
    }),
});

const updateProjectReq = z.object({
    body: z.object({
        title: z.string().optional(),
        slug: z.string().optional(),
        shortDescription: z.string().optional(),
        fullDescription: z.string().optional(),
        thumbnail: z.string().optional(),
        images: z.array(z.string()).optional(),
        technologies: z.array(z.string()).optional(),
        url: z.object({
            live: z.string().optional(),
            githubClient: z.string().optional(),
            githubServer: z.string().optional(),
        }).optional(),
        category: z.string().optional(),
        featured: z.boolean().optional(),
        order: z.number().optional(),
    }),
});

export const ProjectValidation = {
    createProjectReq,
    updateProjectReq,
};
