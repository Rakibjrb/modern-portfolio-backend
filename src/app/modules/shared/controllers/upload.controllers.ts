import { Request, Response } from "express"
import sendResponse from "../../../utils/sendResponse"
import { MediaService } from "../services/upload.services";
import catchAsync from "../../../utils/catchAsync";

export const uploadMedia = catchAsync(async (req: Request, res: Response) => {

    if (!req.file) return sendResponse(req, res, {
        statusCode: 400,
        success: false,
        message: "No file uploaded",
        data: null
    });

    const result = await MediaService.upload(req.file.buffer);

    if (!result) return sendResponse(req, res, {
        statusCode: 400,
        success: false,
        message: "Failed to upload media",
        data: null
    });

    return sendResponse(req, res, {
        statusCode: 201,
        success: true,
        message: "Media uploaded successfully",
        data: result
    });
})