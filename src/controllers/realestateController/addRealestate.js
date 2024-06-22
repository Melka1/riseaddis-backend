import { prisma } from "../../../prisma/main.js";

const addRealestate = async (req, res) => {
  const {
    name,
    images,
    background,
    sisterCompanies,
    previousProjects,
    activeProjects,
    currency,
  } = req.body;

  console.log(req.body);

  if (!name) {
    return res.status(400).json({
      message: "Name is required",
      error: true,
    });
  }

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
        currency,
      },
    });

    return res.status(200).json({ realestate, error: false });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "Server error, please try again",
      error: true,
    });
  } finally {
    prisma.$disconnect();
  }
};

export default addRealestate;
