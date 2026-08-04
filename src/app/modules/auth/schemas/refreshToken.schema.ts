import { Schema, model } from "mongoose";
import { IRefreshToken } from "../interfaces/refreshToken.interface";

const RefreshTokenSchema = new Schema<IRefreshToken>(
    {
        token: { type: String, required: true, unique: true },
        user: { type: Schema.Types.ObjectId, ref: "User", required: true },
        familyId: { type: String, required: true },
        isUsed: { type: Boolean, default: false },
        expiresAt: { type: Date, required: true },
    },
    { timestamps: true }
);

// TTL Index to automatically clean up expired tokens
RefreshTokenSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

export const RefreshToken = model<IRefreshToken>("RefreshTokens", RefreshTokenSchema);