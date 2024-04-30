import { PrismaClient } from "@prisma/client";

const addRealestate = async (req, res) => {
  const { name, images } = req.body;

  const prisma = new PrismaClient();

  let exists = await prisma.realEstate.findFirst({ where: { name } });

  if (exists) {
    return res.status(400).json({
      status: 400,
      message: "Realestate already exists",
      error: true,
    });
  }

  try {
    let realestate = await prisma.realEstate.create({ data: { name, images } });
    res.status(200).json(realestate);
  } catch (err) {
    return res.status(500).json({
      message: err.message,
      error: true,
    });
  }

  prisma.$disconnect();
};

export default addRealestate;
