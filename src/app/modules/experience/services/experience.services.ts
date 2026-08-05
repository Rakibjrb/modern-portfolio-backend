import httpStatus from "http-status";
import AppError from "../../../errors/AppError";
import IExperience from "../interfaces/experience.interface";
import { Experience } from "../schemas/experience.schema";

const getExperiences = async (): Promise<IExperience | null> => {
    const result = await Experience.findOne();
    return result;
};

const createExperience = async (payload: Partial<IExperience>): Promise<IExperience> => {
    const existingExperience = await Experience.findOne();
    if (existingExperience) {
        // If an experience record exists, update/merge it
        const updated = await Experience.findByIdAndUpdate(existingExperience._id, payload, {
            new: true,
            runValidators: true,
        });
        return updated as IExperience;
    }
    const result = await Experience.create(payload);
    return result;
};

const updateExperience = async (
    id: string,
    payload: Partial<IExperience>
): Promise<IExperience | null> => {
    const experience = await Experience.findById(id);
    if (!experience) {
        throw new AppError(httpStatus.NOT_FOUND, "Experience record not found!");
    }

    const updatedExperience = await Experience.findByIdAndUpdate(id, payload, {
        new: true,
        runValidators: true,
    });

    return updatedExperience;
};

const deleteExperience = async (id: string): Promise<IExperience | null> => {
    const experience = await Experience.findById(id);
    if (!experience) {
        throw new AppError(httpStatus.NOT_FOUND, "Experience record not found!");
    }

    const deletedExperience = await Experience.findByIdAndDelete(id);
    return deletedExperience;
};

export const ExperienceService = {
    getExperiences,
    createExperience,
    updateExperience,
    deleteExperience,
};
