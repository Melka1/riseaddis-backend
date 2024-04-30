import { PrismaClient } from "@prisma/client";

const deleteRealestate = async (req, res) => {
  const { id } = req.body;

  if (!id) {
    return res.json({
      message: "Missing required fields",
      error: true,
    });
  }
  const prisma = new PrismaClient();

  try {
    const realestate = await prisma.realEstate.delete({ where: { id } });
    return res
      .status(200)
      .json({ message: "Realestate deleted", data: realestate });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export default deleteRealestate;
