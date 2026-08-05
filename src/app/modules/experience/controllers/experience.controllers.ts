import { Request, Response } from "express";
import httpStatus from "http-status";
import catchAsync from "../../../utils/catchAsync";
import sendResponse from "../../../utils/sendResponse";
import { ExperienceService } from "../services/experience.services";

const getExperiences = catchAsync(async (req: Request, res: Response) => {
    const result = await ExperienceService.getExperiences();

    sendResponse(req, res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Experiences retrieved successfully",
        data: result,
    });
});

const createExperience = catchAsync(async (req: Request, res: Response) => {
    const result = await ExperienceService.createExperience(req.body);

    sendResponse(req, res, {
        statusCode: httpStatus.CREATED,
        success: true,
        message: "Experience created successfully",
        data: result,
    });
});

const updateExperience = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await ExperienceService.updateExperience(id as string, req.body);

    sendResponse(req, res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Experience updated successfully",
        data: result,
    });
});

const deleteExperience = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await ExperienceService.deleteExperience(id as string);

    sendResponse(req, res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Experience deleted successfully",
        data: result,
    });
});

export const ExperienceController = {
    getExperiences,
    createExperience,
    updateExperience,
    deleteExperience,
};
