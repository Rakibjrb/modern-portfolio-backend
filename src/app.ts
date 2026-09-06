import express, { Application, Request, Response, RequestHandler, NextFunction } from "express";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import helmet from "helmet";
import cors from "cors";
import rateLimit from "express-rate-limit";
import compression from "compression";
import sendResponse from "./app/utils/sendResponse";
import globalErrorHandler from "./app/errors/globalErrorHandler";
import notFound from "./app/errors/notFound";
import env from "./app/config/env";
import apiRouter from "./app/routes/index"
import catchAsync from "./app/utils/catchAsync";
import { connectDB } from "./app/config/database";

const app: Application = express();

// 1. Security & Performance Middleware
app.use(helmet());
app.use(compression() as unknown as RequestHandler)
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

// General Rate Limiting
const generalRateLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100,
    message: "Too many requests, please try again later.",
    standardHeaders: true,
    legacyHeaders: false,
})

// 2. CORS Setup
const allAllowedOrigins = [env.FRONTEND_URL, env.ADMIN_DASHBOARD_PANEL_URL]; // incluedes all allowed origins here


export const corsOptions = {
    origin: allAllowedOrigins as string[],
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization", "X-user-id"],
    exposedHeaders: ["X-user-id"],
}

// 3. General middlewares
app.set('trust proxy', 1);
app.use(generalRateLimiter);
app.use(cors(corsOptions));

// Explicitly handle preflight requests
app.options("*", cors(corsOptions));

// 4. Body parser middlwares
app.use(express.json({
    limit: "1mb",
    verify: (req: Request, res: Response, buff: Buffer) => {
        (req as any).rawBody = buff.toString();
    }
}))
app.use(express.urlencoded({
    extended: true, limit: "1mb"
}))
app.use(cookieParser());

// 5. API routes
app.use("/api", catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    await connectDB();
    next();
}), apiRouter);

// 6. Server health check
app.get("/", (req: Request, res: Response) => {
    const client = req.headers["user-agent"]?.toLocaleLowerCase();
    const getClientMessage = (clientType: string) => `Welcome to Modern Portfolio ${env.NODE_ENV === "development" ? "development" : "production"} environment API call from ${clientType}`
    const responseData = {
        version: env.APP_VERSION,
        environment: env.NODE_ENV === "development" ? "development" : "production",
        apiPath: req.originalUrl,
    }

    return sendResponse(req, res, {
        statusCode: 200,
        success: true,
        message: getClientMessage(client),
        data: responseData,
    })
});

// 7. Error handling middleware
app.use(globalErrorHandler);
app.use(notFound);

export default app;