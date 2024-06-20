import { Router } from "express";

import getSite from "../controllers/siteController/getSite.js";
import addSite from "../controllers/siteController/addSite.js";
import getSites from "../controllers/siteController/getSites.js";
import updateSite from "../controllers/siteController/updateSite.js";
import deleteSite from "../controllers/siteController/deleteSite.js";
import getSiteList from "../controllers/siteController/getSiteList.js";
import getAllSites from "../controllers/siteController/getAllSites.js";

import adminAuthentication from "../middlewares/AdminAuthentication.js";
import getSiteOverview from "../controllers/siteController/getSiteOverview.js";

const siteRoute = Router();

siteRoute.get("/overview", adminAuthentication, getSiteOverview);
siteRoute.get("/all", adminAuthentication, getAllSites);
siteRoute.get("/list", getSiteList);
siteRoute.get("/:name", getSite);
siteRoute.get("/", getSites);

siteRoute.post("/", adminAuthentication, addSite);
siteRoute.put("/", adminAuthentication, updateSite);
siteRoute.delete("/", adminAuthentication, deleteSite);

export default siteRoute;
