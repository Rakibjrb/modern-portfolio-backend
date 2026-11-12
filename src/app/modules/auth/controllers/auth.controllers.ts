import { Request, Response } from "express";
import httpStatus from "http-status";
import catchAsync from "../../../utils/catchAsync";
import sendResponse from "../../../utils/sendResponse";
import { AuthService } from "../services/auth.services";
import { RequestWithUser } from "../../../types/index.types";
import AppError from "../../../errors/AppError";
import { cookieOptions } from "../../../utils/cookieOptions";

const registerUser = catchAsync(async (req: Request, res: Response) => {
  const result = await AuthService.registerUser(req.body);

  sendResponse(req, res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "User registered successfully",
    data: result,
  });
});

const loginUser = catchAsync(async (req: Request, res: Response) => {
  const { remember } = req.body;
  const result = await AuthService.loginUser(req.body, remember);

  res.cookie("accessToken", result.accessToken, {
    ...cookieOptions,
    maxAge: 15 * 60 * 1000,
  });

  res.cookie("refreshToken", result.refreshToken, {
    ...cookieOptions,
    maxAge: (remember ? 30 : 7) * 24 * 60 * 60 * 1000,
  });

  sendResponse(req, res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User logged in successfully",
    data: result,
  });
});

const refreshAccessToken = catchAsync(async (req: Request, res: Response) => {
  const refreshToken = req.cookies.refreshToken || req.body.refreshToken;
  if (!refreshToken) {
    throw new AppError(httpStatus.BAD_REQUEST, "Refresh token is required!");
  }

  const result = await AuthService.refreshAccessToken(refreshToken);

  res.cookie("accessToken", result.accessToken, {
    ...cookieOptions,
    maxAge: 15 * 60 * 1000,
  });

  res.cookie("refreshToken", result.refreshToken, {
    ...cookieOptions,
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  sendResponse(req, res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Access token refreshed successfully",
    data: result,
  });
});

const logoutUser = catchAsync(async (req: Request, res: Response) => {
  const refreshToken = req.cookies.refreshToken || req.body.refreshToken;
  if (refreshToken) {
    await AuthService.logoutUser(refreshToken);
  }

  res.clearCookie("refreshToken");
  res.clearCookie("accessToken");

  sendResponse(req, res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Logged out successfully",
    data: null,
  });
});

const getMe = catchAsync(async (req: Request, res: Response) => {
  const reqWithUser = req as RequestWithUser;
  const userId = reqWithUser.user?.id;
  const result = await AuthService.getMe(userId as string);

  sendResponse(req, res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User profile retrieved successfully",
    data: result,
  });
});

const listUsers = catchAsync(async (req: Request, res: Response) => {
  const { page, limit, role, search } = req.query;
  const result = await AuthService.listUsers(
    page as string,
    limit as string,
    role as string,
    search as string,
  );

  sendResponse(req, res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Users retrieved successfully",
    data: result.data,
    meta: result.meta,
  });
});

const updateUser = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await AuthService.updateUser(id as string, req.body);

  sendResponse(req, res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User updated successfully",
    data: result,
  });
});

export const AuthController = {
  registerUser,
  loginUser,
  refreshAccessToken,
  logoutUser,
  getMe,
  listUsers,
  updateUser,
};
