import { prisma } from "../../../prisma/main.js";

const setUserRole = (req, res) => {
  const { userId, role } = req.body;

  if (!userId && !role) {
    return res.status(400).json({
      message: "Required fields not provided",
      error: true,
    });
  }

  try {
    prisma.user
      .update({ where: { id: userId }, data: { role } })
      .then(() => {
        return res.status(200).json({
          message: "User updated successfully",
          error: false,
        });
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).json({
          message: "Server error, please try again!",
          error: true,
        });
      });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Server error, please try again",
      error: true,
    });
  }
};

export default setUserRole;
