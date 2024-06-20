import { PrismaClient } from "@prisma/client";

const getAllPaymentTypes = async (_, res) => {
  let prisma;

  try {
    prisma = new PrismaClient();
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
