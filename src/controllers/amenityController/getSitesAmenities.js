import { PrismaClient } from "@prisma/client";

const getSitesAmenities = async (_, res) => {
  let prisma;

  try {
    prisma = new PrismaClient();
    const siteAmenities = await prisma.site.findMany({
      select: {
        id: true,
        name: true,
        amenities: {
          select: {
            id: true,
            name: true,
            image: true,
          },
        },
        realEstate: {
          select: {
            name: true,
          },
        },
      },
    });

    return res.status(200).json({
      siteAmenities,
      error: false,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Server error. please try again!",
      error: true,
    });
  } finally {
    prisma.$disconnect();
  }
};

export default getSitesAmenities;
