import { prisma } from "../../../prisma/main.js";

const getAllSites = async (_, res) => {
  try {
    const sites = await prisma.site.findMany({
      include: {
        realEstate: {
          select: {
            name: true,
            id: true,
            currency: true,
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
