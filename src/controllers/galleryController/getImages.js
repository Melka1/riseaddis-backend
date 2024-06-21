import { PrismaClient } from "@prisma/client";

const getImages = async (req, res) => {
  let { type } = req.params;
  console.log(type);

  let prisma;

  try {
    prisma = new PrismaClient();

    let images = await prisma.imageGallery.findMany({
      where: {
        name: type,
      },
    });

    return res.status(200).json({
      images,
      error: false,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Server error, please try again!",
      error: true,
    });
  }
};

export default getImages;
