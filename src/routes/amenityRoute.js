import { Router } from "express";

import addAmenityToSite from "../controllers/amenityController/addAmenityToSite.js";
import getAllAmenities from "../controllers/amenityController/getAllAmenities.js";
import getSitesAmenities from "../controllers/amenityController/getSitesAmenities.js";
import deleteAmenity from "../controllers/amenityController/deleteAmenity.js";
import updateAmenity from "../controllers/amenityController/updateAmenity.js";
import adminAuthentication from "../middlewares/AdminAuthentication.js";

const amenityRoute = Router();

amenityRoute.post("/", adminAuthentication, addAmenityToSite);
amenityRoute.get("/", getAllAmenities);
amenityRoute.get("/site", getSitesAmenities);
amenityRoute.delete("/", adminAuthentication, deleteAmenity);
amenityRoute.put("/", adminAuthentication, updateAmenity);

export default amenityRoute;
