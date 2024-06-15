import { Router } from "express";
import addAmenityToSite from "../controllers/amenityController/addAmenityToSite.js";
import getAllAmenities from "../controllers/amenityController/getAllAmenities.js";

const amenityRoute = Router();

amenityRoute.post("/", addAmenityToSite);
amenityRoute.get("/", getAllAmenities);

export default amenityRoute;
