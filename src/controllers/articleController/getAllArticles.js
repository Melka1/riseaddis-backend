import { PrismaClient } from "@prisma/client";

const getAllArticles = async (_, res) => {
  const prisma = new PrismaClient();

  try {
    const articles = await prisma.article.findMany({});

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
