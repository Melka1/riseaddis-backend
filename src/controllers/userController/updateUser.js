import { prisma } from "../../../prisma/main.js";

const updateUser = (req, res) => {
  const { name, image } = req.body;
  const uid = req.user.id;
  console.log(name);

  if (!name && !image) {
    return res.status(400).json({
      message: "Required fields not provided",
      error: true,
    });
  }

  let query = {};

  if (name) query.name = name;
  if (image) query.image = image;

  prisma.user
    .update({ where: { id: uid }, data: query })
    .then((response) => {
      return res.status(200).json({
        message: "User updated successfully",
        error: false,
        user: {
          id: response.id,
          name: response.name,
          email: response.email,
          image: response.image,
          role: response.role,
        },
      });
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).json({
        message: "Server error, please try again!",
        error: true,
      });
    });
};

export default updateUser;
