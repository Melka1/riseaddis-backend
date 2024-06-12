import { Router } from "express";

import addRealestate from "../controllers/realestateController/addRealestate.js";
import updateRealestate from "../controllers/realestateController/updateRealEstate.js";
import deleteRealestate from "../controllers/realestateController/deleteRealEstate.js";
import getRealEstates from "../controllers/realestateController/getRealEstates.js";
import getRealEstate from "../controllers/realestateController/getRealEstate.js";
import getAllRealEstate from "../controllers/realestateController/getAllRealEstate.js";
import getRealEstateList from "../controllers/realestateController/getRealEstateList.js";
import adminAuthentication from "../middlewares/AdminAuthentication.js";

const realestateRoute = Router();

realestateRoute.get("/all", adminAuthentication, getAllRealEstate);
realestateRoute.get("/list", getRealEstateList);
realestateRoute.get("/:name", getRealEstate);
realestateRoute.get("/", getRealEstates);
realestateRoute.post("/", adminAuthentication, addRealestate);
realestateRoute.put("/", adminAuthentication, updateRealestate);
realestateRoute.delete("/", adminAuthentication, deleteRealestate);

export default realestateRoute;
