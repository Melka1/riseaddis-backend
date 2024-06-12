import { Router } from "express";
import getUser from "../controllers/userController/getUser.js ";
import userAuthentication from "../middlewares/UserAuthentication.js";

const userRoute = Router();

userRoute.get("/", userAuthentication, getUser);

export default userRoute;
