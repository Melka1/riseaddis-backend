import { PrismaClient } from "@prisma/client";

const deleteUnit = async (req, res) => {
  const { ids } = req.body;
  console.log(ids);

  if (!ids || ids?.length === 0) {
    return res.json({
      message: "Missing required fields",
      error: true,
    });
  }
  const prisma = new PrismaClient();

  try {
    const unit = await prisma.unit.deleteMany({
      where: {
        id: {
          in: ids,
        },
      },
    });

    console.log(unit);
    return res.status(200).json({ message: "Realestate deleted successfully" });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: "Server error, please try again!" });
  }
};

export default deleteUnit;
