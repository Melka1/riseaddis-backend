import { prisma } from "../../../prisma/main.js";

const updateRealestate = async (req, res) => {
  const {
    id,
    name,
    images,
    background,
    sisterCompanies,
    activeProjects,
    previousProjects,
    currency,
    status,
  } = req.body;

  if (!id) {
    return res.status(400).json({
      message: "Missing required fields!",
      error: true,
    });
  }

  if (
    !name &&
    (!images || images?.length == 0) &&
    !background &&
    (!sisterCompanies || sisterCompanies?.length == 0) &&
    (!activeProjects || activeProjects?.length == 0) &&
    (!previousProjects || previousProjects?.length == 0) &&
    !currency &&
    !status
  ) {
    return res.status(400).json({
      message: "Missing required fields!",
      error: true,
    });
  }

  const query = {};
  if (name) {
    query.name = name;
    query.link = name
      .toLowerCase()
      .split(/\s|-|'/)
      .join("-");
  }
  if (images) query.images = images;
  if (background) query.background = background;
  if (sisterCompanies) query.sisterCompanies = sisterCompanies;
  if (activeProjects) query.activeProjects = activeProjects;
  if (previousProjects) query.previousProjects = previousProjects;
  if (currency) query.currency = currency;
  if (status) query.status = status;

  try {
    const realestate = await prisma.realEstate.update({
      where: { id },
      data: query,
    });

    if (status && status !== "active") {
      prisma.site
        .updateMany({ where: { realEstateId: id }, data: { status: "draft" } })
        .catch((err) => {
          console.log("Failed to update site status", err);
        });
    }

    return res.status(200).json(realestate);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Server error, please try again",
      error: true,
    });
  }
};

export default updateRealestate;
