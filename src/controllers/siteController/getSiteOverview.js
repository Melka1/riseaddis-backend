import { PrismaClient } from "@prisma/client";

const getSiteOverview = async (_, res) => {
  let prisma;

  try {
    prisma = new PrismaClient();
    const sites = await prisma.site.findMany({
      select: {
        status: true,
        featured: true,
        name: true,
        realEstate: {
          select: {
            name: true,
          },
        },
      },
    });

    return res.status(200).json({
      sites,
      error: false,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Server error, please try again!",
      error: true,
    });
  } finally {
    prisma.$disconnect();
  }
};

export default getSiteOverview;
