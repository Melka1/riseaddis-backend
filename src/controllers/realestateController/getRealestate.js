import { prisma } from "../../../prisma/main.js";

const getRealEstate = async (req, res) => {
  const { name } = req.params;

  try {
    const realEstate = await prisma.realEstate.findFirst({
      where: { link: name, status: "active" },
      include: { sites: { where: { status: "active" } } },
    });

    if (!realEstate) {
      return res.status(404).json({
        message: "Real-estate not found",
        error: true,
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
