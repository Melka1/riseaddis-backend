import { Router } from "express";
import getAllPaymentTypes from "../controllers/paymentTypeController/getAllPaymentTypes.js";

const paymentTypeRoute = Router();

paymentTypeRoute.get("/list", getAllPaymentTypes);

export default paymentTypeRoute;
