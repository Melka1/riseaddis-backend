import { PrismaClient } from "@prisma/client";

const getSites = async (req, res) => {
  const prisma = new PrismaClient();

  const sites = await prisma.site.findMany({
    where: { status: "active" },
    include: {
      realEstate: {
        select: {
          name: true,
          link: true,
          images: true,
        },
      },
    },
  });
  console.log(sites);
  res.status(200).json({ sites });
};

export default getSites;
