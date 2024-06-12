import { PrismaClient } from "@prisma/client";

const getAllSites = async (_, res) => {
  const prisma = new PrismaClient();

  try {
    const sites = await prisma.site.findMany({
      include: {
        realEstate: {
          select: {
            name: true,
            id: true,
          },
        },
      },
    });

    return res.status(200).json({
      data: sites,
      error: false,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      message: error.message,
      error: true,
    });
  }
};

export default getAllSites;
