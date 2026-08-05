import { Request } from "express";

export interface RequestWithUser extends Request {
    user?: {
        id: string;
        role: string;
        email: string;
        name?: string;
    };
}

export type ApiResponse<T> = {
    success: boolean;
    message?: string;
    data?: T;
    error?: string;
};