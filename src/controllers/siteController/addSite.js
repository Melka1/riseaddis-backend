import { PrismaClient } from "@prisma/client";

const addSite = async (req, res) => {
  const {
    name,
    description,
    location,
    stage,
    footPrintArea,
    floors,
    basementCount,
    parkingLots,
    oneBedrooms,
    twoBedrooms,
    threeBedrooms,
    realestate,
    images,
  } = req.body;

  if (!name || !realestate) {
    return res.status(400).json({
      message: "Name and Realesate are required",
      error: true,
    });
  }

  if (
    !description &&
    !location &&
    !floors &&
    !parkingLots &&
    !oneBedrooms &&
    !twoBedrooms &&
    !threeBedrooms &&
    !stage
  ) {
    return res.status(400).json({
      message: "At least one field is required",
      error: true,
    });
  }

  const prisma = new PrismaClient();

  let exists = await prisma.site.findFirst({ where: { name } });

  if (exists) {
    return res.status(400).json({
      message: "Site already exists",
      error: true,
    });
  }

  try {
    let site = await prisma.site.create({
      data: {
        name,
        description,
        location,
        stage,
        footPrintArea,
        floors,
        basementCount,
        parkingLots,
        oneBedrooms,
        twoBedrooms,
        threeBedrooms,
        realEstateId: realestate,
        images,
      },
    });

    return res.status(200).json(site);
  } catch (err) {
    return res.status(500).json({
      message: err.message,
      error: true,
    });
  }

  // prisma.$disconnect();
};

export default addSite;
