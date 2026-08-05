import { Schema, model } from "mongoose";
import IContact from "../interfaces/contact.interface";

const contactSchema = new Schema<IContact>(
    {
        name: {
            type: String,
            required: [true, "Name is required"],
            trim: true,
        },
        email: {
            type: String,
            required: [true, "Email is required"],
            trim: true,
            lowercase: true,
        },
        message: {
            type: String,
            required: [true, "Message is required"],
        },
        markAsRead: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
    }
);

export const Contact = model<IContact>("Contact", contactSchema);
