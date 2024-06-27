import { Router } from "express";

import userAuthentication from "../middlewares/UserAuthentication.js";

import getUser from "../controllers/userController/getUser.js";
import updateUser from "../controllers/userController/updateUser.js";

const userRoute = Router();

userRoute.get("/", userAuthentication, getUser);
userRoute.put("/", userAuthentication, updateUser);

export default userRoute;
