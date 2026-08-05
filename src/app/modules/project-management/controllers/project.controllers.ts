import { Request, Response } from "express";
import httpStatus from "http-status";
import catchAsync from "../../../utils/catchAsync";
import sendResponse from "../../../utils/sendResponse";
import { ProjectService } from "../services/project.services";

const createProject = catchAsync(async (req: Request, res: Response) => {
    const result = await ProjectService.createProject(req.body);

    sendResponse(req, res, {
        statusCode: httpStatus.CREATED,
        success: true,
        message: "Project created successfully",
        data: result,
    });
});

const getAllProjects = catchAsync(async (req: Request, res: Response) => {
    const result = await ProjectService.getAllProjects(req.query);

    sendResponse(req, res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Projects retrieved successfully",
        meta: result.meta,
        data: result.data,
    });
});

const getProjectBySlug = catchAsync(async (req: Request, res: Response) => {
    const { slug } = req.params;
    const result = await ProjectService.getProjectBySlug(slug as string);

    sendResponse(req, res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Project retrieved successfully",
        data: result,
    });
});

const updateProject = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await ProjectService.updateProject(id as string, req.body);

    sendResponse(req, res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Project updated successfully",
        data: result,
    });
});

const deleteProject = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await ProjectService.deleteProject(id as string);

    sendResponse(req, res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Project deleted successfully",
        data: result,
    });
});

export const ProjectController = {
    createProject,
    getAllProjects,
    getProjectBySlug,
    updateProject,
    deleteProject,
};
