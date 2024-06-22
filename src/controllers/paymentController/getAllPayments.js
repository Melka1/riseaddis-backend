import { prisma } from "../../../prisma/main.js";

const getAllPayments = async (_, res) => {
  try {
    const payments = await prisma.payment.findMany({
      include: {
        paymentType: {
          select: {
            name: true,
          },
        },
        sites: {
          select: {
            id: true,
            name: true,
            link: true,
          },
        },
      },
    });

    return res.status(200).json({
      payments,
      error: false,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "Server error, please try again!",
      error: true,
    });
  } finally {
    prisma.$disconnect();
  }
};

export default getAllPayments;
