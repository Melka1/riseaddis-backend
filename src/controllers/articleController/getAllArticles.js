import { prisma } from "../../../prisma/main.js";

const getAllArticles = async (_, res) => {
  try {
    const articles = await prisma.article.findMany({
      include: {
        author: {
          select: {
            name: true,
          },
        },
      },
    });

    return res.status(200).json({
      articles,
      error: false,
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

export default getAllArticles;
