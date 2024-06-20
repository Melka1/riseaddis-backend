import { PrismaClient } from "@prisma/client";

const getRealEstateList = async (_, res) => {
  let prisma;

  try {
    prisma = new PrismaClient();
    const realEstates = await prisma.realEstate.findMany({
      where: { status: "active" },
      select: {
        id: true,
        name: true,
        currency: true,
      },
    });
    console.log(realEstates);
    return res.status(200).json({ realEstates, error: false });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Server error, please try again",
      error: true,
    });
  } finally {
    prisma.$disconnect();
  }
};

export default getRealEstateList;
