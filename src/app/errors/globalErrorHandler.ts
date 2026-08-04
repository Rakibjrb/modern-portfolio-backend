import { ErrorRequestHandler, Request, Response, NextFunction } from "express";
import { ZodError } from "zod";

import { TErrorSources } from "../types/error.types";
import handleZodError from "../errors/handleZodError";
import handleValidationError from "../errors/handleValidationError";
import handleCastError from "../errors/handleCastError";
import handleDuplicateError from "../errors/handleDuplicateError";
import AppError from "../errors/AppError";

const globalErrorHandler: ErrorRequestHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
    //setting default values
    let statusCode = err.statusCode || 500;
    let message = err.message || "Something went wrong!";
    let errorSources: TErrorSources = [
        {
            path: '',
            message: 'Something went wrong',
        },
    ];

    if (err instanceof ZodError) {
        const simplifiedError = handleZodError(err);
        statusCode = simplifiedError?.statusCode;
        message = simplifiedError?.message;
        errorSources = simplifiedError?.errorSources;
    } else if (err?.name === "ValidationError") {
        const simplifiedError = handleValidationError(err);
        statusCode = simplifiedError?.statusCode;
        message = simplifiedError?.message;
        errorSources = simplifiedError?.errorSources;
    } else if (err?.name === "CastError") {
        const simplifiedError = handleCastError(err);
        statusCode = simplifiedError?.statusCode;
        message = simplifiedError?.message;
        errorSources = simplifiedError?.errorSources;
    } else if (err?.code === 11000) {
        const simplifiedError = handleDuplicateError(err);
        statusCode = simplifiedError?.statusCode;
        message = simplifiedError?.message;
        errorSources = simplifiedError?.errorSources;
    } else if (err instanceof AppError) {
        statusCode = err?.statusCode;
        message = err.message;
        errorSources = [
            {
                path: '',
                message: err?.message,
            },
        ];
    } else if (err instanceof Error) {
        message = err.message;
        errorSources = [
            {
                path: '',
                message: err?.message,
            },
        ];
    }

    // Build response object
    const responseObject: any = {
        statusCode,
        success: false,
        message,
        errorSources,
    };

    // Add any additional data if present (from AppError)
    if (err instanceof AppError && err.additionalData) {
        // If it's a string that looks like JSON, parse it
        if (typeof err.additionalData === 'string' &&
            err.additionalData.startsWith('{') &&
            err.additionalData.endsWith('}')) {
            try {
                const parsedData = JSON.parse(err.additionalData);
                Object.assign(responseObject, parsedData);
            } catch (e) {
                // If parsing fails, add it as is
                responseObject.data = err.additionalData;
            }
        } else {
            // Add directly if it's already an object
            Object.assign(responseObject, err.additionalData);
        }
    }

    // Return the final response
    return res.status(statusCode).json(responseObject);
}

export default globalErrorHandler;
