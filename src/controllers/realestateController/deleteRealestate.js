import { PrismaClient } from "@prisma/client";

const deleteRealestate = async (req, res) => {
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
    const realestates = await prisma.realEstate.deleteMany({
      where: {
        id: {
          in: ids,
        },
      },
    });

    console.log(realestates);
    return res.status(200).json({ message: "Realestate deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export default deleteRealestate;
