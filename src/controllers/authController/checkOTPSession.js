import { isValidObjectId } from "mongoose";
import { prisma } from "../../../prisma/main.js";

const checkOTPSession = async (req, res) => {
  const { session_id } = req.body;

  if (!session_id) {
    return res.status(400).json({
      message: "Session ID is required",
      error: true,
    });
  }

  if (!isValidObjectId(session_id)) {
    return res.status(400).json({
      message: "Invalid session ID",
      error: true,
    });
  }

  try {
    let OTP = await prisma.oTP.findUnique({ where: { id: session_id } });

    if (!OTP) {
      return res.status(404).json({
        message: "OTP session not found",
        error: true,
      });
    }

    if (OTP.expiresAt < Date.now()) {
      return res.status(400).json({
        message: "OTP session has expired",
        error: true,
      });
    }

    if (!OTP.verified) {
      return res.status(400).json({
        message: "OTP has not been verified",
        error: true,
      });
    }

    return res.status(200).json({
      message: "OTP session is valid",
      error: false,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Server error, please try again",
      error: true,
    });
  }
};

export default checkOTPSession;
