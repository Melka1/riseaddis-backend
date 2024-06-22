import { prisma } from "../../../prisma/main.js";

const getAllAmenities = async (req, res) => {
  try {
    const amenities = await prisma.amenity.findMany({
      include: {
        image: true,
        site: {
          select: {
            name: true,
          },
        },
      },
    });

    return res.status(200).json({
      data: amenities,
      error: false,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: err.message,
      error: true,
    });
  }
};

export default getAllAmenities;
