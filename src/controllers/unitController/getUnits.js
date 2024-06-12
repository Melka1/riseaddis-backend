import { PrismaClient } from "@prisma/client";

const getUnits = async (_, res) => {
  const prisma = new PrismaClient();

  try {
    const units = await prisma.unit.findMany({
      include: { site: { include: { realEstate: true } } },
    });
    console.log(units);
    res.status(200).json({ units, error: false });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Server error, please try again!",
      error: true,
    });
  } finally {
    prisma.$disconnect();
  }
};

export default getUnits;
