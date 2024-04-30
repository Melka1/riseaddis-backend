import { Router } from "express";
import getSite from "../controllers/siteController/getSite.js";
import addSite from "../controllers/siteController/addSite.js";
import getSites from "../controllers/siteController/getSites.js";
import updateSite from "../controllers/siteController/updateSite.js";
import deleteSite from "../controllers/siteController/deleteSite.js";

const siteRoute = Router();

siteRoute.get("/:id", getSite);
siteRoute.get("/", getSites);
siteRoute.post("/", addSite);
siteRoute.put("/", updateSite);
siteRoute.delete("/", deleteSite);

export default siteRoute;
