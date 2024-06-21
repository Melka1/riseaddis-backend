import { PrismaClient } from "@prisma/client";

const deleteAmenity = async (req, res) => {
  const { amenityId } = req.body;
  console.log(amenityId);

  let prisma;

  try {
    prisma = new PrismaClient();

    prisma.amenity
      .delete({
        where: {
          id: amenityId,
        },
      })
      .then(() => {
        return res.status(200).json({
          message: "Amenity deleted successfully",
          error: false,
        });
      });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Server error, please try again!",
      error: true,
    });
  } finally {
    prisma.$disconnect();
  }
};

export default deleteAmenity;
