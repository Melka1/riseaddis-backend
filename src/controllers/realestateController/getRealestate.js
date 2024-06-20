import { PrismaClient } from "@prisma/client";

const getRealEstate = async (req, res) => {
  const { name } = req.params;

  let prisma;

  try {
    prisma = new PrismaClient();
    const realEstate = await prisma.realEstate.findFirst({
      where: { link: name },
      include: { sites: { where: { status: "active" } } },
    });

    if (!realEstate) {
      return res.status(404).json({
        message: "Real-estate not found",
        error: true,
        data: {},
      });
    }

    return res.status(200).json({
      realEstate,
      error: false,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Server error, please try again",
      error: true,
    });
  } finally {
    prisma.$disconnect();
  }
};

export default getRealEstate;
