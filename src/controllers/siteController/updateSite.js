import { PrismaClient } from "@prisma/client";

const updateSite = async (req, res) => {
  const {
    siteId,
    name,
    description,
    status,
    location,
    footPrintArea,
    builtUpArea,
    floors,
    basementCount,
    parkingLots,
    oneBedrooms,
    twoBedrooms,
    threeBedrooms,
    real_estate,
    images,
  } = req.body;

  console.log(req.body, "body");

  const prisma = new PrismaClient();

  let exists = await prisma.site.findFirst({ where: { id: siteId } });

  if (!exists) {
    return res.status(400).json({
      message: "Site not found",
      error: true,
    });
  }

  let query = {};

  if (name) query.name = name;
  if (description) query.description = description;
  if (status) query.status = status;
  if (location) query.location = location;
  if (footPrintArea) query.footPrintArea = footPrintArea;
  if (builtUpArea) query.builtUpArea = builtUpArea;
  if (floors) query.floors = floors;
  if (basementCount || basementCount == 0) query.basementCount = basementCount;
  if (parkingLots || parkingLots == 0) query.parkingLots = parkingLots;
  if (oneBedrooms || oneBedrooms == 0) query.oneBedrooms = oneBedrooms;
  if (twoBedrooms) query.twoBedrooms = twoBedrooms;
  if (threeBedrooms) query.threeBedrooms = threeBedrooms;
  if (images) query.images = images;

  if (real_estate) query.realEstateId = real_estate;

  console.log(query);

  try {
    const updatedSite = await prisma.site.update({
      where: { id: siteId },
      data: query,
    });

    return res.status(200).json({
      status: 200,
      updatedSite,
    });
  } catch (e) {
    console.log(e.message);
    return res.status(500).json({
      message: e.message,
      error: true,
    });
  }

  // prisma.$disconnect();
};

export default updateSite;
