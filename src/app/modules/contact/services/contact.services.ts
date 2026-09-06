import httpStatus from "http-status";
import { FilterQuery } from "mongoose";
import AppError from "../../../errors/AppError";
import IContact from "../interfaces/contact.interface";
import { Contact } from "../schemas/contact.schema";
import { TMeta } from "../../../utils/sendResponse";
import { NodemailerManager } from "../../../managers/nodemailer.manager";

const createContact = async (payload: Partial<IContact>): Promise<IContact> => {
    const result = await Contact.create(payload);

    // Send emails asynchronously to user and admin
    await NodemailerManager.sendContactEmails({
        name: result.name,
        email: result.email,
        message: result.message,
    }).catch((err) => console.error("Failed to send contact emails:", err));

    return result;
};

const getAllContacts = async (
    query: Record<string, unknown>
): Promise<{ data: IContact[]; meta: TMeta }> => {
    const { markAsRead, search, page, limit } = query;

    const filter: FilterQuery<IContact> = {};

    if (markAsRead !== undefined) {
        filter.markAsRead = markAsRead === "true" || markAsRead === true;
    }

    if (search) {
        const searchRegex = new RegExp(search as string, "i");
        filter.$or = [
            { name: searchRegex },
            { email: searchRegex },
            { message: searchRegex },
        ];
    }

    const pageNumber = parseInt(page as string) || 1;
    const limitNumber = parseInt(limit as string) || 10;
    const skip = (pageNumber - 1) * limitNumber;

    const [data, total] = await Promise.all([
        Contact.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limitNumber),
        Contact.countDocuments(filter),
    ]);

    const totalPages = total > 0 ? Math.ceil(total / limitNumber) : 0;

    return {
        data,
        meta: {
            page: pageNumber,
            limit: limitNumber,
            total,
            totalPages,
        },
    };
};

const getContactById = async (id: string): Promise<IContact> => {
    const contact = await Contact.findById(id);
    if (!contact) {
        throw new AppError(httpStatus.NOT_FOUND, "Contact message not found!");
    }
    return contact;
};

const updateContact = async (
    id: string,
    payload: Partial<IContact>
): Promise<IContact | null> => {
    const contact = await Contact.findById(id);
    if (!contact) {
        throw new AppError(httpStatus.NOT_FOUND, "Contact message not found!");
    }

    const updatedContact = await Contact.findByIdAndUpdate(id, payload, {
        new: true,
        runValidators: true,
    });

    return updatedContact;
};

export const ContactService = {
    createContact,
    getAllContacts,
    getContactById,
    updateContact,
};
