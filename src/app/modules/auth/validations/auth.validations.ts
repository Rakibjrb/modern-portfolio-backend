import { z } from "zod";

const registerUserReq = z.object({
    body: z.object({
        name: z.string({
            required_error: "Name is required",
        }),
        email: z
            .string({
                required_error: "Email is required",
            })
            .email("Invalid email format"),
        password: z
            .string({
                required_error: "Password is required",
            })
            .min(20, "Password must be at least 20 characters"),
        role: z.enum(["super_admin"]).optional(),
    }),
});

const loginReq = z.object({
    body: z.object({
        email: z
            .string({
                required_error: "Email is required",
            })
            .email("Invalid email format"),
        password: z.string({
            required_error: "Password is required",
        }),
    }),
});

const updateUserReq = z.object({
    body: z.object({
        role: z.enum(["super_admin"]).optional(),
    }),
});

export const AuthValidation = {
    registerUserReq,
    loginReq,
    updateUserReq,
};