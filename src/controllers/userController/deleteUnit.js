import { prisma } from "../../../prisma/main.js";

const deleteUser = async (req, res) => {
  const { ids } = req.body;

  if (!ids || ids?.length === 0) {
    return res.json({
      message: "Missing required fields",
      error: true,
    });
  }

  try {
    const user = await prisma.user.deleteMany({
      where: {
        id: {
          in: ids,
        },
      },
    });

    return res
      .status(200)
      .json({ message: "User deleted successfully", error: false });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Server error, please try again!", error: true });
  }
};

export default deleteUser;
