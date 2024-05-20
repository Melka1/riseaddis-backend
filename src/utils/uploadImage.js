import { v2 as cloudinary } from "cloudinary";
import { config } from "dotenv";

cloudinary.config({
  cloud_name: "dchmblw88",
  api_key: "662542651398363",
  api_secret: config(process.cwd, ".env").parsed.CLOUDINARY_SECRET_KEY,
});

const options = {
  use_filename: true,
  unique_filename: false,
  overwrite: false,
};

export const uploadImage = (images) => {
  return new Promise((resolve, reject) => {
    let results = [];

    try {
      images.forEach(async (image) => {
        const result = await cloudinary.uploader.upload(image.path, options);
        results.push(result.url);

        if (results.length == images.length) {
          resolve(results);
        }
      });
    } catch (error) {
      console.log(error.message);
      reject(error);
    }
  });
};
