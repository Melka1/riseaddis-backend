import { Router } from "express";

import addRealestate from "../controllers/realestateController/addRealestate.js";
import updateRealestate from "../controllers/realestateController/updateRealestate.js";
import deleteRealestate from "../controllers/realestateController/deleteRealestate.js";
import getRealEstates from "../controllers/realestateController/getRealestates.js";
import getRealEstate from "../controllers/realestateController/getRealestate.js";
import getAllRealEstate from "../controllers/realestateController/getAllRealEstate.js";
import getRealEstateList from "../controllers/realestateController/getRealEstateList.js";
import adminAuthentication from "../middlewares/AdminAuthentication.js";
import getRealestateOverview from "../controllers/realestateController/getRealestateOverview.js";

const realestateRoute = Router();

realestateRoute.get("/overview", adminAuthentication, getRealestateOverview);
realestateRoute.get("/all", adminAuthentication, getAllRealEstate);
realestateRoute.get("/list", getRealEstateList);
realestateRoute.get("/:name", getRealEstate);
realestateRoute.get("/", getRealEstates);
realestateRoute.post("/", adminAuthentication, addRealestate);
realestateRoute.put("/", adminAuthentication, updateRealestate);
realestateRoute.delete("/", adminAuthentication, deleteRealestate);

export default realestateRoute;
