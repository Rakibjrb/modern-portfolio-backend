import mongoose from 'mongoose';
import { TErrorSources, TGenericErrorResponse } from '../types/error.types';

const handleCastError = (error: mongoose.Error.CastError): TGenericErrorResponse => {
    const errorSources: TErrorSources = [
        {
            path: error.path,
            message: error.message,
        },
    ]
    return {
        statusCode: 400,
        message: errorSources.length > 0 ? errorSources[0].message : "Cast Error",
        errorSources,
    }
}

export default handleCastError;
