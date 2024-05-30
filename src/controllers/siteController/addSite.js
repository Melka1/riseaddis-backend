import { PrismaClient } from "@prisma/client";

const addSite = async (req, res) => {
  const {
    name,
    description,
    location,
    footPrintArea,
    builtUpArea,
    floors,
    basementCount,
    buildingType,
    parkingLots,
    studios,
    oneBedrooms,
    twoBedrooms,
    threeBedrooms,
    apartmentSizes,
    realestate,
    stage,
    price,
    numberOfUnits,
    images,
    deliveryTime,
  } = req.body;

  if (!name || !realestate) {
    return res.status(400).json({
      message: "Name and Realestate are required",
      error: true,
    });
  }

  if (
    !name &&
    !description &&
    !location &&
    !footPrintArea &&
    !builtUpArea &&
    !floors &&
    !basementCount &&
    !parkingLots &&
    !studios &&
    !oneBedrooms &&
    !twoBedrooms &&
    !threeBedrooms &&
    !numberOfUnits &&
    !buildingType &&
    !apartmentSizes &&
    !stage &&
    !price &&
    !deliveryTime
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
        link: name.toLowerCase().split(/\s|-/).join("-"),
        description,
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
        images,
        stage,
        price,
        deliveryTime,
        realEstateId: realestate,
      },
    });

    return res.status(200).json(site);
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: err.message,
      error: true,
    });
  } finally {
    prisma.$disconnect();
  }
};

export default addSite;
