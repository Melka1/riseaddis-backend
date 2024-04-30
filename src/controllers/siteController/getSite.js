import { PrismaClient } from "@prisma/client";

const getSite = async (req, res) => {
  const { id } = req.query;

  const prisma = new PrismaClient();

  const site = await prisma.site.findFirst({
    where: { id },
    include: { realEstate: true },
  });
  console.log(site);
  res.status(200).json({ site });
};

export default getSite;
