// import { PrismaClient } from "@prisma/client";
import { prisma } from "../../../prisma/main.js";

const addArticle = async (req, res) => {
  const { title, paragraphs, imageUrl } = req.body;
  const uid = req.uid;

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

  try {
    let exists = await prisma.article.findFirst({
      where: {
        title,
      },
    });

    if (exists) {
      return res.status(400).json({
        message: "Article already exists by this title",
        error: true,
      });
    }

    !exists &&
      prisma.article
        .create({
          data: {
            title,
            link: title.toLowerCase().split(" ").join("-"),
            paragraphs,
            imageUrl,
            author: {
              connect: {
                id: uid,
              },
            },
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
