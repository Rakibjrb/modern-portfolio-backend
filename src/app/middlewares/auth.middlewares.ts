import { NextFunction, Response } from "express";
import httpStatus from "http-status";
import AppError from "../errors/AppError";
import catchAsync from "../utils/catchAsync";
import extractToken from "../utils/extractToken";
import { TokenService } from "../managers/token.manager";
import { User } from "../modules/auth/schemas/user.schema";
import { RequestWithUser } from "../types/index.types";

const auth = (...requiredRoles: string[]) => {
    return catchAsync(async (req: RequestWithUser, res: Response, next: NextFunction) => {
        const token = extractToken(req);

        if (!token) {
            throw new AppError(httpStatus.UNAUTHORIZED, "You are not authorized!");
        }

        // Verify token
        let decoded;
        try {
            decoded = TokenService.verifyToken(token, "auth");
        } catch (err) {
            throw new AppError(httpStatus.UNAUTHORIZED, "You are not authorized!");
        }

        const { userId, email } = decoded;

        if (!userId) {
            throw new AppError(httpStatus.UNAUTHORIZED, "You are not authorized!");
        }

        // Check if the user exists
        const user = await User.findById(userId);

        if (!user) {
            throw new AppError(httpStatus.NOT_FOUND, "This user is not found!");
        }

        // Check role authorization
        if (requiredRoles.length && !requiredRoles.includes(user.role)) {
            throw new AppError(httpStatus.FORBIDDEN, "You have no permission to access this route!");
        }

        req.user = {
            id: user._id.toString(),
            name: user.name,
            email: user.email,
            role: user.role,
        };

        next();

    });
};

export default auth;