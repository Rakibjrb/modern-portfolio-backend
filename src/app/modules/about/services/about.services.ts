import httpStatus from "http-status";
import AppError from "../../../errors/AppError";
import { IAbout } from "../interfaces/about.interface";
import { About } from "../schemas/about.schema";

const getAbout = async (): Promise<IAbout | null> => {
    const result = await About.findOne();
    return result;
};

const createOrUpdateAbout = async (payload: Partial<IAbout>): Promise<IAbout> => {
    const existingAbout = await About.findOne();

    if (existingAbout) {
        if (payload.contacts) {
            payload.contacts = {
                ...existingAbout.contacts,
                ...payload.contacts,
            };
        }

        const updated = await About.findByIdAndUpdate(existingAbout._id, payload, {
            new: true,
            runValidators: true,
        });

        return updated as IAbout;
    } else {
        const created = await About.create(payload);
        return created;
    }
};

const updateAbout = async (id: string, payload: Partial<IAbout>): Promise<IAbout | null> => {
    const about = await About.findById(id);
    if (!about) {
        throw new AppError(httpStatus.NOT_FOUND, "About information not found!");
    }

    if (payload.contacts) {
        payload.contacts = {
            ...about.contacts,
            ...payload.contacts,
        };
    }

    const updated = await About.findByIdAndUpdate(id, payload, {
        new: true,
        runValidators: true,
    });

    return updated;
};

const getSkills = async (): Promise<IAbout | null> => {
    const result = await About.findOne({}, "skills");
    return result;
};

export const AboutService = {
    getAbout,
    createOrUpdateAbout,
    updateAbout,
    getSkills,
};
