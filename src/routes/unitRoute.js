import { Router } from "express";
import getUnits from "../controllers/unitController/getUnits.js";

const unitRoute = Router();

unitRoute.get("/", getUnits);

export default unitRoute;
