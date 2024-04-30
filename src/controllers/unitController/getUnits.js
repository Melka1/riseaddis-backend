import { PrismaClient } from "@prisma/client";

const getUnits = async (req, res) => {
  const prisma = new PrismaClient();

  const units = await prisma.unit.findMany({
    include: { site: { include: { realEstate: true } } },
  });
  console.log(units);
  res.status(200).json({ units });
};

export default getUnits;
