import { PrismaClient } from "@prisma/client";

export default async function updateAmenity(req, res) {
  const { name, imageId, amenityId } = req.body;

  if (!name || !imageId || !amenityId) {
    return res.status(400).json({
      message: "Name, image and amenity id are required",
      error: true,
    });
  }

  let prisma;

  try {
    prisma = new PrismaClient();

    prisma.amenity
      .update({
        where: {
          id: amenityId,
        },
        data: {
          name,
          imageId,
        },
      })
      .then((response) => {
        return res.status(201).json({
          message: "Amenity updated successfully",
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
