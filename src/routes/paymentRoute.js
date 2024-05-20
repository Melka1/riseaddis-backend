import { Router } from "express";
import addPaymentToSite from "../controllers/paymentController/addPaymentToSite.js";

const paymentRoute = Router();

paymentRoute.post("/site", addPaymentToSite);

export default paymentRoute;
