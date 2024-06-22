import { prisma } from "../../../prisma/main.js";

const deletePayments = async (req, res) => {
  const { paymentIds } = req.body;

  if (!paymentIds || paymentIds?.length === 0) {
    return res.json({
      message: "Missing required fields",
      error: true,
    });
  }

  try {
    await prisma.payment.deleteMany({
      where: {
        id: {
          in: paymentIds,
        },
      },
    });

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
