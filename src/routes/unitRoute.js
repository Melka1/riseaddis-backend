import { Router } from "express";
import getUnits from "../controllers/unitController/getUnits.js";
import addUnit from "../controllers/unitController/addUnit.js";

const unitRoute = Router();

unitRoute.get("/", getUnits);
unitRoute.post("/", addUnit);

export default unitRoute;
