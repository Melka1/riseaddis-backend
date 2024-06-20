import { PrismaClient } from "@prisma/client";

const getRealestateOverview = async (_, res) => {
  let prisma;

  try {
    prisma = new PrismaClient();
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
