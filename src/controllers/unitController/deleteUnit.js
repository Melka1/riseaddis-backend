import { prisma } from "../../../prisma/main.js";

const deleteUnit = async (req, res) => {
  const { ids } = req.body;

  if (!ids || ids?.length === 0) {
    return res.json({
      message: "Missing required fields",
      error: true,
    });
  }

  try {
    const unit = await prisma.unit.deleteMany({
      where: {
        id: {
          in: ids,
        },
      },
    });

    return res
      .status(200)
      .json({ message: "Realestate deleted successfully", error: false });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Server error, please try again!", error: true });
  }
};

export default deleteUnit;
