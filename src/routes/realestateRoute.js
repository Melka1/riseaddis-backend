import { Router } from "express";

import addRealestate from "../controllers/realestateController/addRealestate.js";
import updateRealestate from "../controllers/realestateController/updateRealestate.js";
import deleteRealestate from "../controllers/realestateController/deleteRealestate.js";
import getRealEstates from "../controllers/realestateController/getRealestates.js";
import getRealEstate from "../controllers/realestateController/getRealestate.js";

const realestateRoute = Router();

realestateRoute.get("/:name", getRealEstate);
realestateRoute.get("/", getRealEstates);
realestateRoute.post("/", addRealestate);
realestateRoute.put("/", updateRealestate);
realestateRoute.delete("/", deleteRealestate);

export default realestateRoute;
