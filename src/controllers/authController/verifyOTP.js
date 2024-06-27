import { isValidObjectId } from "mongoose";
import { prisma } from "../../../prisma/main.js";

const verifyOTP = async (req, res) => {
  const { otpId, otpValue } = req.body;

  if (!otpId || !otpValue) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  if (!isValidObjectId(otpId)) {
    return res.status(400).json({ message: "Invalid OTP ID" });
  }

  if (otpValue.length < 6) {
    return res.status(400).json({ message: "Invalid OTP value" });
  }

  try {
    const otp = await prisma.oTP.findFirst({ where: { id: otpId } });

    if (!otp) {
      return res.status(404).json({ message: "OTP not found" });
    }

    if (otp.expiresAt < new Date()) {
      return res.status(400).json({ message: "OTP has expired, try again!" });
    }

    if (otp.code !== otpValue) {
      return res.status(400).json({ message: "Incorrect OTP value" });
    }

    return res.status(200).json({ message: "OTP verified successfully" });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ message: "Server error, please try again later" });
  }
};

export default verifyOTP;
