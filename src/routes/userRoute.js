import { Router } from "express";

import userAuthentication from "../middlewares/UserAuthentication.js";
import adminAuthentication from "../middlewares/AdminAuthentication.js";

import getUser from "../controllers/userController/getUser.js";
import updateUser from "../controllers/userController/updateUser.js";
import getUsers from "../controllers/userController/getUsers.js";
import setUserRole from "../controllers/userController/setUserRole.js";
import deleteUser from "../controllers/userController/deleteUnit.js";

const userRoute = Router();

userRoute.get("/", userAuthentication, getUser);
userRoute.put("/", userAuthentication, updateUser);
userRoute.get("/list", adminAuthentication, getUsers);
userRoute.put("/role", adminAuthentication, setUserRole);
userRoute.delete("/", adminAuthentication, deleteUser);

export default userRoute;
