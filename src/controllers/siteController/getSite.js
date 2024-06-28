import { prisma } from "../../../prisma/main.js";

const getSite = async (req, res) => {
  const { name } = req.params;
  const { realestate } = req.query;

  try {
    const site = await prisma.site.findFirst({
      where: { link: name, realEstate: { link: realestate } },
      include: {
        realEstate: true,
        units: {
          where: {
            status: "active",
          },
        },
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

    return res.status(200).json({ site, error: false });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Server error, please try again!",
      error: true,
    });
  }
};

export default getSite;
