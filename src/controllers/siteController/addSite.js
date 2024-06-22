import { prisma } from "../../../prisma/main.js";

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
    realEstateId,
    stage,
    price,
    numberOfUnits,
    images,
    deliveryTime,
  } = req.body;

  if (!name || !realEstateId) {
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

  try {
    let exists = await prisma.site.findFirst({ where: { name } });

    if (exists) {
      return res.status(400).json({
        message: "Site already exists",
        error: true,
      });
    }

    let site = await prisma.site.create({
      data: {
        name,
        realEstateId,
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
      },
    });

    return res.status(200).json({ site, error: false });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Server error, please try again",
      error: true,
    });
  } finally {
    prisma.$disconnect();
  }
};

export default addSite;
