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

const createProfessionalExperience = catchAsync(
  async (req: Request, res: Response) => {
    const payload = req.body.professional || req.body;
    const result = await ExperienceService.createProfessionalExperience(payload);

    sendResponse(req, res, {
      statusCode: httpStatus.CREATED,
      success: true,
      message: "Professional experience created successfully",
      data: result,
    });
  },
);

const updateProfessionalExperience = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const payload = req.body.professional || req.body;
    const result = await ExperienceService.updateProfessionalExperience(
      id as string,
      payload,
    );

    sendResponse(req, res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Professional experience updated successfully",
      data: result,
    });
  },
);

const deleteProfessionalExperience = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await ExperienceService.deleteProfessionalExperience(
      id as string,
    );

    sendResponse(req, res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Professional experience deleted successfully",
      data: result,
    });
  },
);

const createAcademicExperience = catchAsync(
  async (req: Request, res: Response) => {
    const payload = req.body.academic || req.body;
    const result = await ExperienceService.createAcademicExperience(payload);

    sendResponse(req, res, {
      statusCode: httpStatus.CREATED,
      success: true,
      message: "Academic experience created successfully",
      data: result,
    });
  },
);

const updateAcademicExperience = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const payload = req.body.academic || req.body;
    const result = await ExperienceService.updateAcademicExperience(
      id as string,
      payload,
    );

    sendResponse(req, res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Academic experience updated successfully",
      data: result,
    });
  },
);

const deleteAcademicExperience = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await ExperienceService.deleteAcademicExperience(id as string);

    sendResponse(req, res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Academic experience deleted successfully",
      data: result,
    });
  },
);

export const ExperienceController = {
  getExperiences,
  createProfessionalExperience,
  createAcademicExperience,
  updateProfessionalExperience,
  updateAcademicExperience,
  deleteProfessionalExperience,
  deleteAcademicExperience,
};
