import { PrismaClient } from "@prisma/client";

const getRealEstates = async (req, res) => {
  const prisma = new PrismaClient();

  const realEstates = await prisma.realEstate.findMany({
    include: { sites: true },
  });
  console.log(realEstates);
  res.status(200).json({ realEstates });
};

export default getRealEstates;
