import { prisma } from "../../../prisma/main.js";

const deleteRealestate = async (req, res) => {
  const { ids } = req.body;
  console.log(ids);

  if (!ids || ids?.length === 0) {
    return res.json({
      message: "Missing required fields",
      error: true,
    });
  }

  try {
    const realEstates = await prisma.realEstate.deleteMany({
      where: {
        id: {
          in: ids,
        },
      },
    });

    return res.status(200).json({
      message: `Realestate${
        realEstates.length > 1 ? "s" : ""
      } deleted successfully`,
      error: false,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Server error, please try again", error: true });
  } finally {
    prisma.$disconnect();
  }
};

export default deleteRealestate;
