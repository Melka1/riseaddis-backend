import { PrismaClient } from "@prisma/client";

const getRealEstates = async (req, res) => {
  const prisma = new PrismaClient();

  const realEstates = await prisma.realEstate.findMany({
    where: { status: "active" },
    include: {
      sites: {
        select: { name: true, price: true, link: true, location: true },
      },
    },
  });
  return res.status(200).json({ realEstates });
};

export default getRealEstates;
