import { Request, Response, NextFunction } from "express";
import multer, { MulterError } from "multer";
import sendResponse from "../utils/sendResponse";

const upload = multer({
    storage: multer.memoryStorage(),
    limits: {
        fileSize: 1024 * 1024 * 2,
        files: 5
    },
    fileFilter: (req: any, file: any, cb: any) => {
        const allowedMimeTypes = [
            'image/jpeg',
            'image/png',
            'image/jpg',
        ];

        const isAllowedMime = allowedMimeTypes.includes(file.mimetype);
        const isAllowedExt = /\.(jpg|jpeg|png)$/i.test(file.originalname);

        if (isAllowedMime || isAllowedExt) {
            cb(null, true);
        } else {
            cb(new Error("Invalid file type, only PNG, JPG, and JPEG files are allowed"));
        }
    }
})

const handleMulterUpload = (error: any, req: Request, res: Response, next: NextFunction) => {
    if (error instanceof MulterError) {
        if (error.code === "LIMIT_FILE_SIZE") {
            return sendResponse(req, res, {
                statusCode: 400,
                success: false,
                message: "File size exceeds the limit of 5MB",
                data: null
            })
        }

        if (error.code === "LIMIT_FILE_COUNT") {
            return sendResponse(req, res, {
                statusCode: 400,
                success: false,
                message: "Too many files uploaded, maximum 5 files are allowed",
                data: null
            })
        }
    }

    if (error.message.includes("Invalid file type")) {
        return sendResponse(req, res, {
            statusCode: 400,
            success: false,
            message: "Invalid file type, only PNG, JPG, and JPEG files are allowed",
            data: null
        })
    }

    next(error);
}

export const uploadFile = (req: Request, res: Response, next: NextFunction) => {
    // console.log("Starting file upload process...");

    upload.single("file")(req as any, res as any, (err: any) => {
        try {
            if (err) {
                // console.log("Multer Error detected:", err.message);
                return handleMulterUpload(err, req, res, next);
            }

            if (!req.file) {
                // console.log("No file received in request");
                return res.status(400).json({
                    success: false,
                    message: "No file uploaded!"
                });
            }

            // console.log("File uploaded successfully to memory:", req.file.originalname);
            next();
        } catch (catchErr) {
            // console.error("Internal Middleware Error:", catchErr);
            next(catchErr);
        }
    });
};