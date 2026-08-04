import jwt, { Secret, SignOptions } from "jsonwebtoken";
import env from "../config/env";
import mongoose from "mongoose";

export type TokenType = "auth" | "refresh" | "email_verification" | "reset_password" | "login" | "temp";

export interface ITokenPayload {
    userId?: mongoose.Types.ObjectId;
    email: string;
    type: TokenType;
    timestamp?: number;
}

export interface IAuthResponse {
    accessToken: string;
    refreshToken: string;
    user: {
        id: mongoose.Types.ObjectId;
        email: string;
        name: string;
    }
}

export interface ITokenOptions {
    expiresIn?: string;
    secret?: string;
}

export interface IEmailVerificationPayload extends ITokenPayload {
    type: "email_verification";
    userId: mongoose.Types.ObjectId;
    email: string;
}

export interface IPasswordSetupPayload extends ITokenPayload {
    type: "reset_password";
    userId: mongoose.Types.ObjectId;
    email: string;
}

export interface IAuthPayload extends ITokenPayload {
    type: "auth";
    userId: mongoose.Types.ObjectId;
    email: string;
    role: string;
}

export interface IRefreshPayload extends ITokenPayload {
    type: "refresh";
    userId: mongoose.Types.ObjectId;
    email: string;
}

export class TokenService {
    private static secretForType(type?: TokenType): string {
        if (type === "refresh") return env.REFRESH_TOKEN_SECRET as string;
        return (env.AUTH_TOKEN_SECRET as string) || "fallback-access-token-secret";
    }

    // token expiration defaults
    private static readonly TOKEN_EXPIRATION = {
        email_verification: "24h",
        password_setup: "24h",
        password_reset: "15m",
        otp_verification: "5m",
        temp: "30m",
        login: "24h",
        auth: env.AUTH_TOKEN_EXPIRE_IN || "1h",
        refresh: env.REFRESH_TOKEN_EXPIRE_IN || "7d",
    }

    // GenerateToken with payload
    static generateToken<T extends ITokenPayload>(payload: T, options: ITokenOptions = {}): string {
        const { expiresIn = this.TOKEN_EXPIRATION[payload.type as keyof typeof this.TOKEN_EXPIRATION],
            secret = this.secretForType(payload.type)
        } = options;
        // add time stamp if not present
        if (!payload.timestamp) {
            payload.timestamp = Date.now();
        }

        return jwt.sign(payload, secret as Secret, { expiresIn: expiresIn as SignOptions["expiresIn"] });
    }

    // Generate auth Token
    static generateAuthToken(userId: string, email: string, role: string): string {
        const payload: IAuthPayload = {
            type: "auth",
            userId: new mongoose.Types.ObjectId(userId),
            email,
            timestamp: Date.now(),
            role
        }
        return this.generateToken(payload);
    }

    // generate refresh token
    static generateRefreshToken(userId: string, email: string, remember?: boolean): string {
        const payload: IRefreshPayload = {
            type: "refresh",
            userId: new mongoose.Types.ObjectId(userId),
            email,
            timestamp: Date.now()
        }
        return this.generateToken(payload, { secret: this.secretForType("refresh"), expiresIn: remember ? "30d" : "7d" })
    }

    // verify token
    static verifyToken(token: string, type?: TokenType): ITokenPayload {
        const secret = this.secretForType(type);
        return jwt.verify(token, secret as Secret) as ITokenPayload;
    }

    // generate tokens auth & refresh
    static generateTokenPair(userId: string, email: string, role: string, remember?: boolean): { accessToken: string, refreshToken: string } {
        const accessToken = this.generateAuthToken(userId, email, role);
        const refreshToken = this.generateRefreshToken(userId, email, remember);
        return { accessToken, refreshToken };
    }

    static generateTempToken(userId: string, email: string): string {
        const payload: ITokenPayload = {
            type: "temp",
            userId: new mongoose.Types.ObjectId(userId),
            email,
            timestamp: Date.now()
        }

        return this.generateToken(payload, { expiresIn: "15m" });
    }
}