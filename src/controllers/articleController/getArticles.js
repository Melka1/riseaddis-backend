import { prisma } from "../../../prisma/main.js";

const getArticles = async (_, res) => {
  try {
    const articles = await prisma.article.findMany({
      orderBy: [
        {
          createdAt: "desc",
        },
      ],
      where: { status: "published" },
      include: {
        author: {
          select: {
            name: true,
            image: true,
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
  }
};

export default getArticles;
