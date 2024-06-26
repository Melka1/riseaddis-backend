import { prisma } from "../../../prisma/main.js";

const getArticle = async (req, res) => {
  const { name } = req.params;

  try {
    const article = await prisma.article.findFirst({
      where: { link: name, status: "published" },
      include: {
        author: {
          select: {
            name: true,
            image: true,
            role: true,
          },
        },
      },
    });

    if (!article) {
      return res.status(404).json({
        message: "Article not found",
        error: true,
      });
    }

    return res.status(200).json({ article, error: false });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Server error, please try again!",
      error: true,
    });
  }
};

export default getArticle;
