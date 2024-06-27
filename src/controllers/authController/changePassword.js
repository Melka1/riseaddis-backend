import { prisma } from "../../../prisma/main.js";
import { hash } from "bcrypt";
import { isValidObjectId } from "mongoose";

const changePassword = async (req, res) => {
  const { password, session_id } = req.body;

  if (!password || !session_id) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  if (!isValidObjectId(session_id)) {
    return res.status(400).json({ message: "Invalid session_id" });
  }

  try {
    const otp = await prisma.oTP.findUnique({ where: { id: session_id } });

    if (otp.expiresAt < Date.now()) {
      return res
        .status(400)
        .json({ message: "OTP has expired, please try again!" });
    }

    prisma.user
      .update({
        where: { id: otp.uid },
        data: { password: await hash(password, 10) },
      })
      .then(() => {
        res.status(200).json({ message: "Password updated successfully!" });
      })
      .catch((err) => {
        console.error(err);
        res.status(500).json({ message: "Server error, try again later" });
      });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error, try again later" });
  }
};

export default changePassword;
