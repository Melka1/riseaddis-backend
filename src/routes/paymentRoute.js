import { Router } from "express";
import getAllPayments from "../controllers/paymentController/getAllPayments.js";
import createPayment from "../controllers/paymentController/createPayment.js";
import updatePayment from "../controllers/paymentController/updatePayment.js";
import deletePayments from "../controllers/paymentController/deletePayment.js";
import adminAuthentication from "../middlewares/AdminAuthentication.js";

const paymentRoute = Router();

paymentRoute.put("/", adminAuthentication, updatePayment);
paymentRoute.post("/", adminAuthentication, createPayment);
paymentRoute.get("/", adminAuthentication, getAllPayments);
paymentRoute.delete("/", adminAuthentication, deletePayments);

export default paymentRoute;
