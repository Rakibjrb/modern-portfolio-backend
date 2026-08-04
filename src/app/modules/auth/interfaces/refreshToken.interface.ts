import { Schema, Document } from "mongoose";

export interface IRefreshToken extends Document {
    token: string;
    user: Schema.Types.ObjectId;
    familyId: string;
    isUsed: boolean;
    expiresAt: Date;
}