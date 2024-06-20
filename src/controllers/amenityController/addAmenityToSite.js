import { PrismaClient } from "@prisma/client";

export default async function addAmenityToSite(req, res) {
  const { name, imageId, siteId } = req.body;

  if (!name || !imageId || !siteId) {
    return res.status(400).json({
      message: "Name, image and siteId are required",
      error: true,
    });
  }

  let prisma;

  try {
    prisma = new PrismaClient();

    prisma.amenity
      .create({
        data: {
          name,
          imageId,
          siteId,
        },
      })
      .then((response) => {
        return res.status(201).json({
          message: "Amenity added successfully",
          data: response,
          error: false,
        });
      })
      .catch((error) => {
        return res.status(500).json({
          message: error.message,
          error: true,
        });
      })
      .finally(() => {
        prisma.$disconnect();
      });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
      error: true,
    });
  }
}
