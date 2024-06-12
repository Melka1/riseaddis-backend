import { PrismaClient } from "@prisma/client";
import { compare } from "bcrypt";
import { config } from "dotenv";
import Jwt from "jsonwebtoken";

const HASH_SECRET_KEY = config(process.cwd, "../../../.env").parsed
  .HASH_SECRET_KEY;

const loginUserController = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.json({
      message: "Missing required fields",
      error: true,
    });
  }

  const prisma = new PrismaClient();

  try {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      return res.status(404).json({
        message: "User not found",
        error: true,
      });
    }

    const isPasswordMatch = await compare(password, user.password);

    if (!isPasswordMatch) {
      return res.status(400).json({
        message: "Invalid password",
        error: true,
      });
    }

    console.log(HASH_SECRET_KEY);

    const token = Jwt.sign(
      {
        from: "Rise Addis Properties",
        uid: user.id,
        iat: Date.now(),
      },
      riseaddis.com,
      {
        expiresIn: 1000 * 60 * 60 * 24 * 30,
      }
    );

    return res.status(200).json({
      message: "Logged in successfully",
      token,
      user: {
        name: user.name,
        email: user.email,
        role: user.role,
      },
      error: false,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Server error, please try again!", error: true });
  }
};

export default loginUserController;
