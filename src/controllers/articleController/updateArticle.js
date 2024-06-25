import { prisma } from "../../../prisma/main.js";

const updateArticle = async (req, res) => {
  const { articleId, title, paragraphs, imageUrl, status } = req.body;

  if (!articleId) {
    return res.json({
      message: "Missing required fields",
      error: true,
    });
  }

  if (
    !title &&
    !imageUrl &&
    (!paragraphs || paragraphs.length == 0) &&
    !status
  ) {
    return res.status(400).json({
      message: "Missing required fields",
      error: true,
    });
  }

  let query = {};

  if (title) query.title = title;
  if (paragraphs) query.paragraphs = paragraphs;
  if (imageUrl) query.imageUrl = imageUrl;
  if (status) query.status = status;

  try {
    prisma.article
      .update({
        where: {
          id: articleId,
        },
        data: query,
      })
      .then(() => {
        return res.json({
          message: "Article updated successfully",
          error: false,
        });
      });
  } catch (err) {
    console.log(err);
    return res.json({
      message: "Server error, please try again!",
      error: true,
    });
  }
};

export default updateArticle;
