import { PrismaClient } from "@prisma/client";

const addArticle = async (req, res) => {
  const { title, paragraphs, imageUrl } = req.body;

  if (!title) {
    return res.json({
      message: "Title of article is required",
      error: true,
    });
  }

  if (!paragraphs || paragraphs.length == 0) {
    return res.json({
      message: "At least one paragraph is required",
      error: true,
    });
  }

  const prisma = new PrismaClient();

  try {
    prisma.article
      .create({
        data: {
          title,
          link: title.toLowerCase().split(" ").join("-"),
          paragraphs,
          imageUrl,
        },
      })
      .then(() => {
        return res.status(200).json({
          message: "Article added successfully",
          error: false,
        });
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).json({
          message: "Server error, please try again later",
          error: true,
        });
      });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "Server error, please try again later",
      error: true,
    });
  }
};

export default addArticle;
