import Jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";
import { config } from "dotenv";

const HASH_SECRET_KEY = config(process.cwd, ".env").parsed.HASH_SECRET_KEY;

const adminAuthentication = (req, res, next) => {
  const bearer = req.headers?.authorization?.split(" ")[0];
  const token = req.headers?.authorization?.split(" ")[1];

  if (!token || bearer !== "Bearer") {
    return res.status(400).json({
      message: "Authentication failed: No token provided",
      error: true,
    });
  }

  const tokenValues = Jwt.decode(token, HASH_SECRET_KEY);

  if (!tokenValues) {
    return res.status(400).json({
      message: "Authentication failed: Invalid token provided",
      error: true,
    });
  }

  const { exp, uid } = tokenValues;

  if (Date.now() > exp) {
    return res.status(400).json({
      message: "Authentication failed: Token expired",
      error: true,
    });
  }

  let prisma;

  try {
    prisma = new PrismaClient();

    prisma.user.findUnique({ where: { id: uid } }).then((user) => {
      if (!user) {
        return res.status(404).json({
          message: "User not found",
          error: true,
        });
      }

      if (user.role == "admin") {
        req.uid = uid;
        return next();
      } else {
        return res.status(401).json({
          message: "You are not authorized to access this page",
          error: true,
        });
      }
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      message: "Server error, please try again!",
      error: true,
    });
  } finally {
    prisma.$disconnect();
  }
};

export default adminAuthentication;
