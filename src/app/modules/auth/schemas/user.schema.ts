import { Schema, model } from "mongoose";
import bcrypt from "bcryptjs";
import env from "../../../config/env";
import { IUser } from "../interfaces/user.interface";

const UserSchema = new Schema<IUser>(
    {
        name: { type: String, required: true },
        email: { type: String, unique: true, required: true },
        password: { type: String, required: true, select: false },
        role: { type: String, default: "super_admin" },
    },
    {
        timestamps: true,
    }
);

// Pre-save hook to hash password
UserSchema.pre<IUser>("save", async function (next) {
    if (!this.isModified("password")) {
        return next();
    }
    try {
        this.password = await bcrypt.hash(this.password, Number(env.BCRYPT_SALT_ROUNDS) || 10);
        next();
    } catch (error: any) {
        next(error);
    }
});

// Instance method to compare password
UserSchema.methods.isPasswordMatched = async function (password: string): Promise<boolean> {
    return await bcrypt.compare(password, this.password);
};

export const User = model<IUser>("User", UserSchema);