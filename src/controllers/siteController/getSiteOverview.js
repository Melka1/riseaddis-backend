import { prisma } from "../../../prisma/main.js";

const getSiteOverview = async (_, res) => {
  try {
    const sites = await prisma.site.findMany({
      select: {
        id: true,
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
