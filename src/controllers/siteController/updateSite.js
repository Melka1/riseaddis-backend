import { PrismaClient } from "@prisma/client";

const updateSite = async (req, res) => {
  const {
    siteId,
    name,
    realEstateId,
    description,
    status,
    location,
    footPrintArea,
    builtUpArea,
    floors,
    basementCount,
    parkingLots,
    studios,
    oneBedrooms,
    twoBedrooms,
    threeBedrooms,
    numberOfUnits,
    buildingType,
    apartmentSizes,
    price,
    stage,
    deliveryTime,
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
  if (studios || studios == 0) query.studios = studios;
  if (oneBedrooms || oneBedrooms == 0) query.oneBedrooms = oneBedrooms;
  if (twoBedrooms || oneBedrooms == 0) query.twoBedrooms = twoBedrooms;
  if (threeBedrooms || oneBedrooms == 0) query.threeBedrooms = threeBedrooms;
  if (images) query.images = images;
  if (numberOfUnits) query.numberOfUnits = numberOfUnits;
  if (buildingType) query.buildingType = buildingType;
  if (apartmentSizes) query.apartmentSizes = apartmentSizes;
  if (price) query.price = price;
  if (stage) query.stage = stage;
  if (deliveryTime) query.deliveryTime = deliveryTime;
  if (realEstateId) query.realEstateId = realEstateId;

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
      message: "Server error, please try again!",
      error: true,
    });
  }
};

export default updateSite;
