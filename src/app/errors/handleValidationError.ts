import mongoose from "mongoose";
import { TErrorSources, TGenericErrorResponse } from "../types/error.types";

const handleValidationError = (error: mongoose.Error.ValidationError): TGenericErrorResponse => {
    const errorSources: TErrorSources = Object.values(error.errors).map((val: mongoose.Error.ValidatorError | mongoose.Error.CastError) => {
        return {
            path: val.path,
            message: val.message,
        }
    })
    return {
        statusCode: 400,
        message: errorSources.length > 0 ? errorSources[0].message : "Validation Error",
        errorSources,
    }
}

export default handleValidationError;