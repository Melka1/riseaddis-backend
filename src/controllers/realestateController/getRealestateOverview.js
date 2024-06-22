import { prisma } from "../../../prisma/main.js";

const getRealestateOverview = async (_, res) => {
  try {
    const realEstates = await prisma.realEstate.findMany({
      select: {
        status: true,
      },
    });

    return res.status(200).json({
      realEstates,
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

export default getRealestateOverview;
