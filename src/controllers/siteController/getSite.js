import { PrismaClient } from "@prisma/client";

const getSite = async (req, res) => {
  const { name } = req.params;

  const prisma = new PrismaClient();

  try {
    const site = await prisma.site.findFirst({
      where: { link: name },
      include: {
        realEstate: true,
        units: true,
        payments: {
          include: {
            paymentType: true,
          },
        },
        amenities: {
          include: { image: true },
        },
      },
    });
    console.log(site);
    return res.status(200).json({ site });
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      message: "Server error, please try again!",
      error: true,
    });
  } finally {
    prisma.$disconnect();
  }
};

export default getSite;
