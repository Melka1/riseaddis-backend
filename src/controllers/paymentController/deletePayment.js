import { PrismaClient } from "@prisma/client";

const deletePayments = async (req, res) => {
  const { paymentIds } = req.body;

  if (!paymentIds || paymentIds?.length === 0) {
    return res.json({
      message: "Missing required fields",
      error: true,
    });
  }
  const prisma = new PrismaClient();

  try {
    const payments = await prisma.payment.deleteMany({
      where: {
        id: {
          in: paymentIds,
        },
      },
    });

    console.log(payments);
    return res.status(200).json({
      message: `Payment${
        paymentIds.length > 0 ? "s" : ""
      } deleted successfully`,
      error: false,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server error, please try again", error: true });
  } finally {
    prisma.$disconnect();
  }
};

export default deletePayments;
