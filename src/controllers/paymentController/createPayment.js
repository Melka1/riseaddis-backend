import { PrismaClient } from "@prisma/client";
import { isValidObjectId } from "mongoose";

export default function createPayment(req, res) {
  const { paymentTypeId, paymentList, siteIds } = req.body;

  if (!paymentTypeId || !paymentList || paymentList.length == 0) {
    return res.status(400).json({
      message: "Missing required fields",
      error: true,
    });
  }

  if (!isValidObjectId(paymentTypeId)) {
    return res.status(400).json({
      message: "Invalid payment type id",
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
          siteIds,
          sites: {
            connect: siteIds.map((siteId) => {
              return {
                id: siteId,
              };
            }),
          },
        },
      })
      .then((payment) => {
        return res
          .status(200)
          .json({ message: "Payment Created", data: payment, error: false });
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
