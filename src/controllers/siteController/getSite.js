import { PrismaClient } from "@prisma/client";

const getSite = async (req, res) => {
  const { name } = req.params;

  const prisma = new PrismaClient();

  const site = await prisma.site.findFirst({
    where: { link: name },
    include: { realEstate: true, units: true },
  });
  console.log(site);
  res.status(200).json({ site });
};

export default getSite;
