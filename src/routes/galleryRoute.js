import { Router } from "express";
import addImagesToGallery from "../controllers/galleryController/addImagesToGallery.js";
import ExpressFormidable from "express-formidable";

const galleryRoute = Router();

// galleryRoute.get("/", addImagesToGallery);
galleryRoute.post(
  "/",
  ExpressFormidable({
    multiples: true,
  }),
  addImagesToGallery
);

export default galleryRoute;
