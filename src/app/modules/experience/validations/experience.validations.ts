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
  type: z.enum(
    ["Full-time", "Part-time", "Contract", "Internship", "Freelance"],
    {
      required_error: "Experience type is required",
    },
  ),
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

const createProfessionalExperienceReq = z.object({
  body: professionalSchema.or(
    z.object({
      professional: professionalSchema,
    }),
  ),
});

const createAcademicExperienceReq = z.object({
  body: academicSchema.or(
    z.object({
      academic: academicSchema,
    }),
  ),
});

const updateProfessionalExperienceReq = z.object({
  body: professionalSchema.partial().or(
    z.object({
      professional: professionalSchema.partial(),
    }),
  ),
});

const updateAcademicExperienceReq = z.object({
  body: academicSchema.partial().or(
    z.object({
      academic: academicSchema.partial(),
    }),
  ),
});

export const ExperienceValidation = {
  createProfessionalExperienceReq,
  createAcademicExperienceReq,
  updateProfessionalExperienceReq,
  updateAcademicExperienceReq,
};
