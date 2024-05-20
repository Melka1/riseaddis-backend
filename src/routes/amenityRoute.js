import { Router } from "express";
import addAmenityToSite from "../controllers/amenityController/addAmenityToSite.js";

const amenityRoute = Router();

amenityRoute.post("/", addAmenityToSite);

export default amenityRoute;
