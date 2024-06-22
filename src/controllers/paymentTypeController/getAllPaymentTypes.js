import { prisma } from "../../../prisma/main.js";

const getAllPaymentTypes = async (_, res) => {
  try {
    const paymentTypes = await prisma.paymentType.findMany({});

    return res.status(200).json({
      paymentTypes,
      error: false,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: true,
      message: "Server error, please try again!",
    });
  } finally {
    prisma.$disconnect();
  }
};

export default getAllPaymentTypes;
