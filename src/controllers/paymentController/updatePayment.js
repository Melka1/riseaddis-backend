import { PrismaClient } from "@prisma/client";
import { isValidObjectId } from "mongoose";

export default async function updatePayment(req, res) {
  const { paymentId, siteIds, paymentList, paymentTypeId } = req.body;

  if (!paymentId) {
    return res.status(400).json({
      message: "Missing required fields",
      error: true,
    });
  }

  if (
    !siteIds &&
    siteIds.length == 0 &&
    !paymentTypeId &&
    !paymentList &&
    paymentList.length == 0
  ) {
    return res.status(400).json({
      message: "Missing required fields",
      error: true,
    });
  }

  let validIds = true;

  if (!isValidObjectId(paymentId)) {
    return res.status(400).json({
      message: "Invalid payment id",
      error: true,
    });
  }

  [...siteIds].map((siteId) => {
    if (!isValidObjectId(siteId)) {
      validIds = false;
    }
  });

  if (!validIds) {
    return res.status(400).json({
      message: "Invalid site ids",
      error: true,
    });
  }

  try {
    const prisma = new PrismaClient();
    const payment = await prisma.payment.update({
      where: {
        id: paymentId,
      },
      data: {
        paymentTypeId,
        list: paymentList,
        siteIds: {
          set: siteIds,
        },
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
      message: `Payment updated successfully`,
      payment,
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
