import httpStatus from "http-status";
import mongoose, { FilterQuery } from "mongoose";
import AppError from "../../../errors/AppError";
import { IUser } from "../interfaces/user.interface";
import { User } from "../schemas/user.schema";
import { RefreshToken } from "../schemas/refreshToken.schema";
import { RegisterUserReq, LoginReq, UpdateUserReq } from "../interfaces/auth.interface";
import { TokenService, IAuthResponse } from "../../../managers/token.manager";
import { TMeta } from "../../../utils/sendResponse";

const registerUser = async (payload: RegisterUserReq): Promise<IUser> => {
    const existingUser = await User.findOne({ email: payload.email });
    if (existingUser) {
        throw new AppError(httpStatus.CONFLICT, "User with this email already exists!");
    }

    const user = await User.create(payload);

    // Return user without password
    const userObj = user.toObject();
    delete (userObj as any).password;

    return userObj as IUser;
};

const loginUser = async (payload: LoginReq, remember?: boolean): Promise<IAuthResponse> => {
    const user = await User.findOne({ email: payload.email }).select("+password");
    if (!user) {
        throw new AppError(httpStatus.NOT_FOUND, "User not found!");
    }

    const isPasswordMatched = await user.isPasswordMatched(payload.password);
    if (!isPasswordMatched) {
        throw new AppError(httpStatus.UNAUTHORIZED, "Incorrect password!");
    }

    const { accessToken, refreshToken } = TokenService.generateTokenPair(
        user._id.toString(),
        user.email,
        user.role,
        remember
    );

    // Store refresh token in database for RTR
    const familyId = new mongoose.Types.ObjectId().toString();
    const expiresAt = new Date(Date.now() + (remember ? 30 : 7) * 24 * 60 * 60 * 1000);

    // Revoke all previous sessions/refresh tokens for this user
    await RefreshToken.deleteMany({ user: user._id });

    await RefreshToken.create({
        token: refreshToken,
        user: user._id,
        familyId,
        expiresAt,
    });

    return {
        accessToken,
        refreshToken,
        user: {
            id: user._id,
            email: user.email,
            name: user.name,
        },
    };
};

const refreshAccessToken = async (
    token: string
): Promise<{ accessToken: string; refreshToken: string }> => {
    let decoded;
    try {
        decoded = TokenService.verifyToken(token, "refresh");
    } catch (err) {
        throw new AppError(httpStatus.UNAUTHORIZED, "Invalid refresh token!");
    }

    const { userId } = decoded;

    // Find the stored token record
    const tokenRecord = await RefreshToken.findOne({ token });
    if (!tokenRecord) {
        throw new AppError(httpStatus.UNAUTHORIZED, "Refresh token not recognized!");
    }

    // Reuse Detection
    if (tokenRecord.isUsed) {
        // Delete all tokens belonging to the same family (revoke the whole session chain)
        await RefreshToken.deleteMany({ familyId: tokenRecord.familyId });
        throw new AppError(
            httpStatus.UNAUTHORIZED,
            "Compromised session detected. All sessions revoked. Please log in again!"
        );
    }

    // Verify user exists and is active
    const user = await User.findById(userId);
    if (!user) {
        throw new AppError(httpStatus.NOT_FOUND, "User not found!");
    }

    // Invalidate the old token
    tokenRecord.isUsed = true;
    await tokenRecord.save();

    // Generate new token pair
    const newAccessToken = TokenService.generateAuthToken(user._id.toString(), user.email, user.role);
    const newRefreshToken = TokenService.generateRefreshToken(user._id.toString(), user.email);

    // Save new refresh token record with the same familyId
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
    await RefreshToken.create({
        token: newRefreshToken,
        user: user._id,
        familyId: tokenRecord.familyId,
        expiresAt,
    });

    return {
        accessToken: newAccessToken,
        refreshToken: newRefreshToken,
    };
};

const logoutUser = async (token: string): Promise<void> => {
    const tokenRecord = await RefreshToken.findOne({ token });
    if (tokenRecord) {
        // Revoke the entire family/session
        await RefreshToken.deleteMany({ familyId: tokenRecord.familyId });
    }
};

const getMe = async (userId: string): Promise<IUser | null> => {
    const user = await User.findById(userId);
    if (!user) {
        throw new AppError(httpStatus.NOT_FOUND, "User not found!");
    }
    return user;
};

const listUsers = async (
    page: string,
    limit: string,
    role: string,
    search: string
): Promise<{ data: IUser[]; meta: TMeta }> => {

    const pageNumber = parseInt(page) || 1;
    const limitNumber = parseInt(limit) || 10;
    const skip = (pageNumber - 1) * limitNumber;

    const filter: FilterQuery<IUser> = {};
    if (role) filter.role = role;
    if (search) {
        filter.$or = [
            { email: { $regex: search, $options: 'i' } },
            { name: { $regex: search, $options: 'i' } }
        ];
    }

    const [data, total] = await Promise.all([
        User.find(filter).skip(skip).limit(limitNumber),
        User.countDocuments(filter)
    ]);

    const totalPages = total > 0 ? Math.ceil(total / limitNumber) : 0;

    return {
        data,
        meta: {
            page: pageNumber,
            limit: limitNumber,
            total,
            totalPages
        }
    };
};

const updateUser = async (userId: string, payload: UpdateUserReq): Promise<IUser | null> => {
    const user = await User.findById(userId);
    if (!user) {
        throw new AppError(httpStatus.NOT_FOUND, "User not found!");
    }

    if (payload.role !== undefined) {
        user.role = payload.role;
    }

    await user.save();
    return user;
};

export const AuthService = {
    registerUser,
    loginUser,
    refreshAccessToken,
    logoutUser,
    getMe,
    listUsers,
    updateUser,
};