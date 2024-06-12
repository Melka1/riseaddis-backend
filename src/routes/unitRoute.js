import { Router } from "express";
import getUnits from "../controllers/unitController/getUnits.js";
import addUnit from "../controllers/unitController/addUnit.js";
import getAllUnits from "../controllers/unitController/getAllUnits.js";
import updateUnit from "../controllers/unitController/updateUnit.js";
import deleteUnit from "../controllers/unitController/deleteUnit.js";

const unitRoute = Router();

unitRoute.get("/", getUnits);
unitRoute.post("/", addUnit);
unitRoute.get("/all", getAllUnits);
unitRoute.put("/", updateUnit);
unitRoute.delete("/", deleteUnit);

export default unitRoute;
