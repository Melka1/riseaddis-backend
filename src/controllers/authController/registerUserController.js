import { PrismaClient } from "@prisma/client";
import { hash } from "bcrypt";
import { config } from "dotenv";
import Jwt from "jsonwebtoken";
import { isEmailValid } from "../../libs/validate.js";

const HASH_SECRET_KEY = config(process.cwd, ".env").parsed.HASH_SECRET_KEY;

const registerUserController = async (req, res) => {
  let { name, email, password } = req.body;

  if (!email || !password || !name) {
    return res.json({
      message: "Missing required fields",
      error: true,
    });
  }

  if (!isEmailValid({ email })) {
    return res.status(400).json({
      message: "Invalid email",
      error: true,
    });
  }

  const prisma = new PrismaClient();

  try {
    let exists = await prisma.user.findFirst({ where: { email } });

    if (exists) {
      return res.status(400).json({
        message: "User already exists",
        error: true,
      });
    }

    let user = await prisma.user.create({
      data: {
        name,
        email,
        password: await hash(password, 10),
      },
    });

    const token = Jwt.sign(
      {
        from: "Rise Addis Properties",
        uid: user.id,
        iat: Date.now(),
      },
      HASH_SECRET_KEY,
      {
        expiresIn: 60 * 60 * 24 * 30,
      }
    );

    return res.status(200).json({
      token,
      user: {
        name: user.name,
        email: user.email,
        role: user.role,
      },
      message: "User created successfully",
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

export default registerUserController;
