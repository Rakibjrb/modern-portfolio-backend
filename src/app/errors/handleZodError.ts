import { ZodError, ZodIssue } from 'zod';
import { TErrorSources } from '../types/error.types';

const handleZodError = (error: ZodError) => {
    const errorSources: TErrorSources = error.issues.map((issue: ZodIssue) => {
        return {
            path: issue.path[issue.path.length - 1],
            message: issue.message,
        }
    })

    return {
        statusCode: 422,
        message: "Validation Error",
        errorSources,
    }
};

export default handleZodError;
