import { z } from "zod";

const socialLinkSchema = z.object({
    iconUrl: z.string({ required_error: "Icon URL is required" }),
    name: z.string({ required_error: "Social network name is required" }),
    url: z.string({ required_error: "Social profile URL is required" }),
});

const createAboutReq = z.object({
    body: z.object({
        image: z.string({ required_error: "Image is required" }),
        name: z.string({ required_error: "Name is required" }),
        designation: z.string({ required_error: "Designation is required" }),
        experience: z.number({ required_error: "Experience is required" }),
        techstack: z.string({ required_error: "Tech stack is required" }),
        completedProjects: z.number({ required_error: "Completed projects count is required" }),
        currentRole: z.string({ required_error: "Current role is required" }),
        description: z.string({ required_error: "Description is required" }),
        quote: z.string({ required_error: "Quote is required" }),
        cvlink: z.string({ required_error: "CV link is required" }),
        contacts: z.object({
            phone: z.string({ required_error: "Phone is required" }),
            email: z.string({ required_error: "Email is required" }).email("Invalid email format"),
        }),
        socialsLinks: z.array(socialLinkSchema).default([]),
    }),
});

const updateAboutReq = z.object({
    body: z.object({
        image: z.string().optional(),
        name: z.string().optional(),
        designation: z.string().optional(),
        experience: z.number().optional(),
        techstack: z.string().optional(),
        completedProjects: z.number().optional(),
        currentRole: z.string().optional(),
        description: z.string().optional(),
        quote: z.string().optional(),
        cvlink: z.string().optional(),
        contacts: z.object({
            phone: z.string().optional(),
            email: z.string().email("Invalid email format").optional(),
        }).optional(),
        socialsLinks: z.array(socialLinkSchema).optional(),
    }),
});

export const AboutValidation = {
    createAboutReq,
    updateAboutReq,
};
