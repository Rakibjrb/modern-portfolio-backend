import { Router } from "express";
import validateRequest from "../../../middlewares/validateRequest";
import { AuthValidation } from "../validations/auth.validations";
import { AuthController } from "../controllers/auth.controllers";
import auth from "../../../middlewares/auth.middlewares";

const authRouter = Router();
const userRouter = Router();

// Auth routes
// authRouter.post(
//     "/register",
//     validateRequest(AuthValidation.registerUserReq),
//     AuthController.registerUser
// );

authRouter.post(
    "/login",
    validateRequest(AuthValidation.loginReq),
    AuthController.loginUser
);

authRouter.post(
    "/refresh",
    AuthController.refreshAccessToken
);

authRouter.post(
    "/logout",
    AuthController.logoutUser
);

authRouter.get(
    "/me",
    auth("super_admin"),
    AuthController.getMe
);

userRouter.put(
    "/:id",
    auth("super_admin"),
    validateRequest(AuthValidation.updateUserReq),
    AuthController.updateUser
);

export const AuthRoutes = authRouter;
export const UserRoutes = userRouter;