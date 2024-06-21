import { Router } from "express";

import addImagesToGallery from "../controllers/galleryController/addImagesToGallery.js";
import getImages from "../controllers/galleryController/getImages.js";

const galleryRoute = Router();

galleryRoute.get("/:type", getImages);
galleryRoute.post("/", addImagesToGallery);

export default galleryRoute;
