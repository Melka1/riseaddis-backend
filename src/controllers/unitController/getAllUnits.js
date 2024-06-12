import { PrismaClient } from "@prisma/client";

const getAllUnits = async (_, res) => {
  const prisma = new PrismaClient();

  try {
    const unitList = await prisma.unit.findMany({
      include: {
        site: {
          include: {
            realEstate: {
              select: {
                name: true,
              },
            },
          },
        },
      },
    });

    let units = unitList.map((unit) => {
      return {
        id: unit.id,
        name: unit.name,
        bathroom: unit.bathroom,
        bedroom: unit.bedroom,
        balcony: unit.balcony,
        images: unit.images,
        netArea: unit.netArea,
        commonArea: unit.commonArea,
        totalArea: unit.totalArea,
        available: unit.available,
        total: unit.total,
        status: unit.status,
        price: unit.price,
        site: {
          id: unit.site.id,
          name: unit.site.name,
          realEstate: {
            id: unit.site.realEstate.id,
            name: unit.site.realEstate.name,
          },
        },
      };
    });

    return res.status(200).json({
      units,
      error: false,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      message: "Server error, please try again",
      error: true,
    });
  } finally {
    prisma.$disconnect();
  }
};

export default getAllUnits;
