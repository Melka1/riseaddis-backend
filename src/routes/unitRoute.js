import { Router } from "express";

import getUnits from "../controllers/unitController/getUnits.js";
import addUnit from "../controllers/unitController/addUnit.js";
import getAllUnits from "../controllers/unitController/getAllUnits.js";
import updateUnit from "../controllers/unitController/updateUnit.js";
import deleteUnit from "../controllers/unitController/deleteUnit.js";
import adminAuthentication from "../middlewares/AdminAuthentication.js";
import getUnitOverview from "../controllers/unitController/getUnitOverview.js";

const unitRoute = Router();

unitRoute.get("/overview", adminAuthentication, getUnitOverview);
unitRoute.get("/", getUnits);
unitRoute.post("/", adminAuthentication, addUnit);
unitRoute.get("/all", adminAuthentication, getAllUnits);
unitRoute.put("/", adminAuthentication, updateUnit);
unitRoute.delete("/", adminAuthentication, deleteUnit);

export default unitRoute;
