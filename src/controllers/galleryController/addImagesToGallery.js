import { PrismaClient } from "@prisma/client";
import { uploadImage } from "../../utils/uploadImage.js";

export default function addImagesToGallery(req, res) {
  const { image } = req.files;
  let { name } = req.fields;

  if (!image) {
    return res.status(400).json({
      message: "No image was uploaded",
      error: true,
    });
  }

  let images = [];

  if (image.length) {
    images = [...image];
  } else {
    images = [image];
  }

  try {
    const prisma = new PrismaClient();

    uploadImage(images).then((data) => {
      let imageList = data.map((image) => ({
        name,
        imageUrl: image,
      }));
      prisma.imageGallery
        .createMany({
          data: imageList,
        })
        .then((resp) => {
          return res.status(200).json({
            message: "Images uploaded successfully",
            error: false,
            data: resp,
          });
        })
        .finally(() => {
          prisma.$disconnect();
        });
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
      error: true,
    });
  }
}
