import { Router } from "express";

import registerUserController from "../controllers/authController/registerUserController.js";
import loginUserController from "../controllers/authController/loginUserController.js";

const authRoute = Router();

authRoute.post("/register", registerUserController);
authRoute.post("/login", loginUserController);

export default authRoute;
