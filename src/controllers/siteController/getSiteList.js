import { PrismaClient } from "@prisma/client";

const getSiteList = async (req, res) => {
  const prisma = new PrismaClient();

  const sites = await prisma.site.findMany({
    where: { status: "active" },
    select: {
      id: true,
      name: true,
    },
  });
  console.log(sites);
  res.status(200).json({ sites });
};

export default getSiteList;
