import { prisma } from "../../../prisma/main.js";

const getUnitOverview = async (_, res) => {
  try {
    const units = await prisma.unit.findMany({
      select: {
        status: true,
      },
    });

    return res.status(200).json({
      units,
      error: false,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Server error, please try again!",
      error: true,
    });
  } finally {
    prisma.$disconnect();
  }
};

export default getUnitOverview;
