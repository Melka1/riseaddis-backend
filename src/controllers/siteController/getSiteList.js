import { PrismaClient } from "@prisma/client";

const getSiteList = async (req, res) => {
  let prisma;

  try {
    prisma = new PrismaClient();
    const sites = await prisma.site.findMany({
      where: { status: "active" },
      select: {
        id: true,
        name: true,
        realEstate: {
          select: {
            currency: true,
          },
        },
      },
    });
    console.log(sites);
    return res.status(200).json({ sites, error: false });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Server error, please try again", error: true });
  } finally {
    prisma.$disconnect();
  }
};

export default getSiteList;
