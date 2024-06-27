import { Router } from "express";

import registerUserController from "../controllers/authController/registerUserController.js";
import loginUserController from "../controllers/authController/loginUserController.js";
import requestPasswordChange from "../controllers/authController/requestPasswordChange.js";
import verifyOTP from "../controllers/authController/verifyOTP.js";
import checkOTPSession from "../controllers/authController/checkOTPSession.js";

const authRoute = Router();

authRoute.post("/register", registerUserController);
authRoute.post("/login", loginUserController);
authRoute.post("/requestOTP", requestPasswordChange);
authRoute.post("/verifyOTP", verifyOTP);
authRoute.post("/checkOTPSession", checkOTPSession);

export default authRoute;
