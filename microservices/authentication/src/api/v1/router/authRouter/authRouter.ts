import express, { Router } from "express";
import { registerController } from "../../controller/authController/registerController";
import { loginController } from "../../controller/authController/loginController";
import { refreshTokenController } from "../../controller/authController/refreshTokenController";
import { verfiyActivationTokenController } from "../../controller/authController/activationTokenController";
import { verifyEmailController } from "../../controller/authController/verifyEmailController";
import { forgetPasswordController } from "../../controller/authController/forgetPasswordController";
import { changePasswordController } from "../../controller/authController/changePasswordController";
import { resetPasswordController } from "../../controller/authController/resetPasswordController";

const authRouter: Router = express.Router();

authRouter.post("/register", registerController);
authRouter.post("/login", loginController);
authRouter.post("/refresh-token", refreshTokenController);

authRouter.post("/activate-account", verfiyActivationTokenController);
authRouter.post("/verify-email", verifyEmailController);

authRouter.post("/change-password", changePasswordController);
authRouter.post("/forgot-password", forgetPasswordController);
authRouter.post("/reset-password", resetPasswordController);

export default authRouter;