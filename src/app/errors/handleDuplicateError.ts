import { TErrorSources, TGenericErrorResponse } from "../types/error.types";

const handleDuplicateError = (err: any): TGenericErrorResponse => {
    const match = err.message.match(/"([^"]*)"/);
    const duplicateKey = Object.keys(err.keyValue)[0];

    const extractedMessage = match && match[1];

    const errorSources: TErrorSources = [
        {
            path: duplicateKey,
            message: `${extractedMessage} is already exists`,
        },
    ];

    const statusCode = 409;

    return {
        statusCode,
        message: 'Mongoose Duplicate Error',
        errorSources,
    };
};

export default handleDuplicateError;
