import { PrismaClient } from "@prisma/client";

const getArticles = async (req, res) => {
  let prisma;

  try {
    prisma = new PrismaClient();
    const articles = await prisma.article.findMany({
      where: { status: "published" },
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

export default getArticles;
