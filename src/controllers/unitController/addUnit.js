import { PrismaClient } from "@prisma/client";

const addUnit = async (req, res) => {
  const {
    bathroom,
    bedroom,
    balcony,
    netArea,
    commonArea,
    totalArea,
    payments,
    available,
    siteId,
    images,
  } = req.body;

  console.log(req.body);

  if (
    !siteId ||
    !bathroom
    // !bedroom ||
    // !balcony ||
    // !netArea ||
    // !commonArea ||
    // !totalArea ||
    // !payments ||
    // !available
  ) {
    return res.status(400).json({
      message: "Please provide required fields",
      error: false,
    });
  }

  const prisma = new PrismaClient();

  try {
    const unit = await prisma.unit.create({
      data: {
        siteId,
        bathroom,
        bedroom,
        balcony,
        netArea,
        commonArea,
        totalArea,
        payments,
        images: [
          ...images,
          "https://res.cloudinary.com/dchmblw88/image/upload/v1715964244/RAP_-_Logo_Design_V02-04_fy5srs.jpg",
        ],
        available,
      },
    });

    return res.status(200).json({
      message: "Unit created successfully",
      unit,
      error: false,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: error.message,
      error: true,
    });
  } finally {
    prisma.$disconnect();
  }
};

export default addUnit;
