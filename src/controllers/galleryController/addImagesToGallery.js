import { prisma } from "../../../prisma/main.js";

export default async function addImagesToGallery(req, res) {
  let { name, image } = req.body;

  if (!image) {
    return res.status(400).json({
      message: "Missing required fields",
      error: true,
    });
  }

  try {
    const imageUploaded = await prisma.imageGallery.create({
      data: {
        name,
        imageUrl: image,
      },
    });

    return res.status(200).json({
      message: "Image uploaded successfully",
      error: false,
      imageUploaded,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
      error: true,
    });
  } finally {
    prisma.$disconnect();
  }
}
