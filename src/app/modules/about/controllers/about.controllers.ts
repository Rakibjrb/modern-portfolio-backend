import { Request, Response } from "express";
import httpStatus from "http-status";
import catchAsync from "../../../utils/catchAsync";
import sendResponse from "../../../utils/sendResponse";
import { AboutService } from "../services/about.services";

const getAbout = catchAsync(async (req: Request, res: Response) => {
    const result = await AboutService.getAbout();

    sendResponse(req, res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "About information retrieved successfully",
        data: result,
    });
});

const getSkills = catchAsync(async (req: Request, res: Response) => {
    const result = await AboutService.getSkills();

    sendResponse(req, res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Skills retrieved successfully",
        data: result,
    });
})

const createOrUpdateAbout = catchAsync(async (req: Request, res: Response) => {
    const result = await AboutService.createOrUpdateAbout(req.body);

    sendResponse(req, res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "About information saved successfully",
        data: result,
    });
});

const updateAbout = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await AboutService.updateAbout(id as string, req.body);

    sendResponse(req, res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "About information updated successfully",
        data: result,
    });
});

export const AboutController = {
    getAbout,
    getSkills,
    createOrUpdateAbout,
    updateAbout,
};
