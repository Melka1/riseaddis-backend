import { PrismaClient } from "@prisma/client";

const getSites = async (_, res) => {
  const prisma = new PrismaClient();

  try {
    const sites = await prisma.site.findMany({
      where: { status: "active" },
      include: {
        realEstate: {
          select: {
            name: true,
            link: true,
            images: true,
            currency: true,
          },
        },
      },
    });
    console.log(sites);
    return res.status(200).json({
      sites,
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

export default getSites;
