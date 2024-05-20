import { PrismaClient } from "@prisma/client";
import { isValidObjectId } from "mongoose";

export default function addPaymentToSite(req, res) {
  const { paymentTypeId, paymentList, siteId } = req.body;

  if (!paymentTypeId || !paymentList || paymentList.length == 0 || !siteId) {
    return res.status(400).json({
      message: "Missing required fields",
      error: true,
    });
  }

  if(!isValidObjectId(paymentTypeId)){
    return res.status(400).json({
      message: "Invalid payment type id",
      error: true,
    });
  }

  if(!isValidObjectId(siteId)){
    return res.status(400).json({
      message: "Invalid site id",
      error: true,
    });
  }

  const prisma = new PrismaClient();

  try {
    prisma.payment
      .create({
        data: {
          paymentTypeId,
          list: paymentList,
          siteId,
        },
      })
      .then((payment) => {
        return res
          .status(200)
          .json({ message: "Payment added", data: payment, error: false });
      })
      .catch((error) => {
        return res.status(500).json({ message: error.message, error: true });
      })
      .finally(() => {
        prisma.$disconnect();
      });
  } catch (error) {
    return res.status(500).json({ message: error.message, error: true });
  }
}
