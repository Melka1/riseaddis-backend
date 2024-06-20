import { PrismaClient } from "@prisma/client";

const deleteSite = async (req, res) => {
  const { ids } = req.body;
  console.log(ids);

  if (!ids || ids?.length === 0) {
    return res.json({
      message: "Missing required fields",
      error: true,
    });
  }
  let prisma;

  try {
    prisma = new PrismaClient();
    const site = await prisma.site.deleteMany({
      where: {
        id: {
          in: ids,
        },
      },
    });

    console.log(site);
    return res
      .status(200)
      .json({ message: "Site deleted successfully", error: false });
  } catch (error) {
    console.log(error.message);
    return res
      .status(500)
      .json({ message: "Server error, please try again!", error: true });
  } finally {
    prisma.$disconnect();
  }
};

export default deleteSite;
