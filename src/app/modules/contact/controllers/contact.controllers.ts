import { Request, Response } from "express";
import httpStatus from "http-status";
import catchAsync from "../../../utils/catchAsync";
import sendResponse from "../../../utils/sendResponse";
import { ContactService } from "../services/contact.services";

const createContact = catchAsync(async (req: Request, res: Response) => {
    const { email, name, message } = req.body;
    const result = await ContactService.createContact({ email, name, message });

    sendResponse(req, res, {
        statusCode: httpStatus.CREATED,
        success: true,
        message: "Contact message sent successfully",
        data: result,
    });
});

const getAllContacts = catchAsync(async (req: Request, res: Response) => {
    const result = await ContactService.getAllContacts(req.query);

    sendResponse(req, res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Contact messages retrieved successfully",
        meta: result.meta,
        data: result.data,
    });
});

const getContactById = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await ContactService.getContactById(id as string);

    sendResponse(req, res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Contact message retrieved successfully",
        data: result,
    });
});

const updateContact = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const payload = { ...req.body };

    // Support query parameter markAsRead (e.g. ?markAsRead=true or ?markAsRead=false)
    if (req.query.markAsRead !== undefined) {
        payload.markAsRead = req.query.markAsRead === "true";
    }

    const result = await ContactService.updateContact(id as string, payload);

    sendResponse(req, res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Contact message updated successfully",
        data: result,
    });
});

export const ContactController = {
    createContact,
    getAllContacts,
    getContactById,
    updateContact,
};
