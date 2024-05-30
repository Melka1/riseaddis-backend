import { PrismaClient } from "@prisma/client";

const getRealEstate = async (req, res) => {
  const { name } = req.params;

  const prisma = new PrismaClient();

  try {
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
      data: realEstate,
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

export default getRealEstate;
