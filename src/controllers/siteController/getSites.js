import { PrismaClient } from "@prisma/client";

const getSites = async (req, res) => {
  const prisma = new PrismaClient();

  const sites = await prisma.site.findMany({ include: { realEstate: true } });
  console.log(sites);
  res.status(200).json({ sites });
};

export default getSites;
