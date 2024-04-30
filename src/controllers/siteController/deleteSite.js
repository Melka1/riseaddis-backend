import { PrismaClient } from "@prisma/client";

const deleteSite = async (req, res) => {
  const { id } = req.body;

  if (!id) {
    return res.json({
      message: "Missing required fields",
      error: true,
    });
  }
  const prisma = new PrismaClient();

  try {
    const site = await prisma.site.delete({ where: { id } });
    return res.status(200).json({ message: "Site deleted", data: site });
  } catch (error) {
    return res.status(500).json({ message: error.message, error: true });
  }
};

export default deleteSite;
