import { isValidObjectId } from "mongoose";
import { prisma } from "../../../prisma/main.js";

export default async function updatePayment(req, res) {
  const { paymentId, siteIds, paymentList, paymentTypeId, previousSiteList } =
    req.body;

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

  let siteListToConnect = siteIds
    .filter((siteId) => !previousSiteList.includes(siteId))
    .map((siteId) => {
      return {
        id: siteId,
      };
    });
  let siteListToDisconnect = previousSiteList
    .filter((siteId) => !siteIds.includes(siteId))
    .map((siteId) => {
      return {
        id: siteId,
      };
    });

  try {
    const payment = await prisma.payment.update({
      where: {
        id: paymentId,
      },
      data: {
        paymentTypeId,
        list: paymentList,
        sites: {
          connect: siteListToConnect,
          disconnect: siteListToDisconnect,
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
  }
}
