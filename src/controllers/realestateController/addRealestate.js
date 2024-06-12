import { PrismaClient } from "@prisma/client";

const addRealestate = async (req, res) => {
  const {
    name,
    images,
    background,
    sisterCompanies,
    previousProjects,
    activeProjects,
  } = req.body;

  console.log(req.body);

  if (!name) {
    return res.status(400).json({
      message: "Name is required",
      error: true,
    });
  }

  const prisma = new PrismaClient();

  try {
    let exists = await prisma.realEstate.findFirst({ where: { name } });

    if (exists) {
      return res.status(400).json({
        status: 400,
        message: "Realestate already exists",
        error: true,
      });
    }

    let realestate = await prisma.realEstate.create({
      data: {
        name,
        images,
        link: name.toLowerCase().split(/\s|-/).join("-"),
        background,
        sisterCompanies: sisterCompanies || [],
        previousProjects: previousProjects || [],
        activeProjects: activeProjects || [],
      },
    });
    res.status(200).json(realestate);
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: err.message,
      error: true,
    });
  }

  prisma.$disconnect();
};

export default addRealestate;
