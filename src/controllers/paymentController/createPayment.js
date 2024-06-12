import { PrismaClient } from "@prisma/client";
import { isValidObjectId } from "mongoose";

export default async function createPayment(req, res) {
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
    const payment = await prisma.payment.create({
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
    });

    return res.status(200).json({
      message: `Payment created successfully`,
      data: payment,
      error: false,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Server error, please try again", error: true });
  } finally {
    prisma.$disconnect();
  }
}
