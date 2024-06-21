import { Router } from "express";

import addImagesToGallery from "../controllers/galleryController/addImagesToGallery.js";
import getImages from "../controllers/galleryController/getImages.js";
import adminAuthentication from "../middlewares/AdminAuthentication.js";

const galleryRoute = Router();

galleryRoute.get("/:type", getImages);
galleryRoute.post("/", adminAuthentication, addImagesToGallery);

export default galleryRoute;
