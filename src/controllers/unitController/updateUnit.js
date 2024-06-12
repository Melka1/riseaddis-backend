import { PrismaClient } from "@prisma/client";

const updateUnit = async (req, res) => {
  const {
    unitId,
    name,
    siteId,
    bathroom,
    bedroom,
    balcony,
    netArea,
    commonArea,
    totalArea,
    available,
    images,
    price,
    total,
    status,
  } = req.body;

  console.log(req.body);

  if (
    !siteId &&
    !bathroom &&
    !bedroom &&
    !balcony &&
    !netArea &&
    !commonArea &&
    !totalArea &&
    !available &&
    !total &&
    !price &&
    !images &&
    !status
  ) {
    return res.status(400).json({
      message: "Please provide required fields",
      error: true,
    });
  }

  const prisma = new PrismaClient();

  let exists = await prisma.unit.findFirst({ where: { id: unitId } });

  if (!exists) {
    return res.status(400).json({
      message: "Unit not found",
      error: true,
    });
  }

  let query = {};

  if (name) query.name = name;
  if (siteId) query.siteId = siteId;
  if (bedroom) query.bedroom = bedroom;
  if (bathroom) query.bathroom = bathroom;
  if (balcony) query.balcony = balcony;
  if (netArea) query.netArea = netArea;
  if (commonArea) query.commonArea = commonArea;
  if (totalArea) query.totalArea = totalArea;
  if (available) query.available = available;
  if (total) query.total = total;
  if (price) query.price = price;
  if (images) query.images = images;
  if (status) query.status = status;

  console.log(query);

  try {
    const updatedUnit = await prisma.unit.update({
      where: { id: unitId },
      data: query,
    });

    return res.status(200).json({
      message: "Unit updated successfully",
      error: false,
      updatedUnit,
    });
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

export default updateUnit;
