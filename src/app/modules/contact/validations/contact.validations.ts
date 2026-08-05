import { z } from "zod";

const createContactReq = z.object({
    body: z.object({
        name: z.string({ required_error: "Name is required" }),
        email: z
            .string({ required_error: "Email is required" })
            .email("Invalid email format"),
        message: z.string({ required_error: "Message is required" }),
        markAsRead: z.boolean().optional(),
    }),
});

const updateContactReq = z.object({
    body: z.object({
        name: z.string().optional(),
        email: z.string().email("Invalid email format").optional(),
        message: z.string().optional(),
        markAsRead: z.boolean().optional(),
    }),
});

export const ContactValidation = {
    createContactReq,
    updateContactReq,
};
