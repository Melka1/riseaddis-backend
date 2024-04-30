import { PrismaClient } from "@prisma/client";

const getUnits = async (req, res) => {
  const prisma = new PrismaClient();

  const sites = await prisma.unit.findMany({ include: { site: true } });
  console.log(sites);
  res.status(200).json({ sites });
};

export default getUnits;
