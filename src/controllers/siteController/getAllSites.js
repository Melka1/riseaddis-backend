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
      sites,
      error: false,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      message: "Server error, please try again",
      error: true,
    });
  } finally {
    prisma.$disconnect();
  }
};

export default getAllSites;
