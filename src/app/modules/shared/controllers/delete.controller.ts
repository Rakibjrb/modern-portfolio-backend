import { Request, Response } from "express";
import sendResponse from "../../../utils/sendResponse";
import { MediaService } from "../services/upload.services";
import catchAsync from "../../../utils/catchAsync";

export const deleteMedia = catchAsync(async (req: Request, res: Response) => {
  const public_id = req.params.public_id;
  const result = await MediaService.delete(public_id as string);

  if (!result)
    return sendResponse(req, res, {
      statusCode: 400,
      success: false,
      message: "Failed to delete media from cloud",
      data: null,
    });

  return sendResponse(req, res, {
    statusCode: 200,
    success: true,
    message: "Media deleted from cloud successfully",
    data: result,
  });
});
