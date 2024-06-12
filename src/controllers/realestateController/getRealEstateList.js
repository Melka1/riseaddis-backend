import { PrismaClient } from "@prisma/client";

const getRealEstateList = async (req, res) => {
  const prisma = new PrismaClient();

  const realEstates = await prisma.realEstate.findMany({
    where: { status: "active" },
    select: {
      id: true,
      name: true,
    },
  });
  console.log(realEstates);
  res.status(200).json({ realEstates });
};

export default getRealEstateList;
