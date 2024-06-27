import { Router } from "express";

import registerUserController from "../controllers/authController/registerUserController.js";
import loginUserController from "../controllers/authController/loginUserController.js";
import requestPasswordChange from "../controllers/authController/requestPasswordChange.js";
import verifyOTP from "../controllers/authController/verifyOTP.js";

const authRoute = Router();

authRoute.post("/register", registerUserController);
authRoute.post("/login", loginUserController);
authRoute.post("/requestOTP", requestPasswordChange);
authRoute.post("/verifyOTP", verifyOTP);

export default authRoute;
