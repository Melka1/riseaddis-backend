import { PrismaClient } from "@prisma/client";

const getAllRealEstate = async (_, res) => {
  const prisma = new PrismaClient();

  try {
    const realEstates = await prisma.realEstate.findMany({});

    return res.status(200).json({
      data: realEstates,
      error: false,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      message: "Server error, please try again!",
      error: true,
    });
  } finally {
    prisma.$disconnect();
  }
};

export default getAllRealEstate;
