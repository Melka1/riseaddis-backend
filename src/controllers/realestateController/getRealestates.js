import { PrismaClient } from "@prisma/client";

const getRealEstates = async (_, res) => {
  let prisma;

  try {
    prisma = new PrismaClient();
    const realEstates = await prisma.realEstate.findMany({
      where: { status: "active" },
      include: {
        sites: {
          select: { name: true, price: true, link: true, location: true },
        },
      },
    });

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

export default getRealEstates;
