import { z } from "zod";

const professionalSchema = z.object({
    title: z.string({ required_error: "Title is required" }),
    organization: z.string({ required_error: "Organization is required" }),
    description: z.string({ required_error: "Description is required" }),
    startDate: z.string({ required_error: "Start date is required" }),
    endDate: z.string().optional(),
    responsibilities: z.array(z.string()).default([]),
    achievements: z.array(z.string()).default([]),
    location: z.string({ required_error: "Location is required" }),
    type: z.enum(["Full-time", "Part-time", "Contract", "Internship", "Freelance"], {
        required_error: "Experience type is required",
    }),
});

const academicSchema = z.object({
    title: z.string({ required_error: "Title is required" }),
    organization: z.string({ required_error: "Organization is required" }),
    description: z.string({ required_error: "Description is required" }),
    startDate: z.string({ required_error: "Start date is required" }),
    endDate: z.string().optional(),
    degree: z.string({ required_error: "Degree is required" }),
    fieldOfStudy: z.string({ required_error: "Field of study is required" }),
    result: z.string({ required_error: "Result is required" }),
    location: z.string({ required_error: "Location is required" }),
});

const createExperienceReq = z.object({
    body: z.object({
        professional: z.array(professionalSchema).default([]),
        academic: z.array(academicSchema).default([]),
    }),
});

const updateExperienceReq = z.object({
    body: z.object({
        professional: z.array(professionalSchema).optional(),
        academic: z.array(academicSchema).optional(),
    }),
});

export const ExperienceValidation = {
    createExperienceReq,
    updateExperienceReq,
};
