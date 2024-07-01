import { prisma } from "../../../prisma/main.js";

const getUsers = async (req, res) => {
  let uid = req.uid;
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        image: true,
      },
    });

    return res.status(200).json({
      users: users.filter((user) => user.id != uid),
      error: false,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error, please try again" });
  }
};

export default getUsers;
