import resetPasswordText from "../../utils/resetPasswordText.js";
import nodemailer from "nodemailer";
import { prisma } from "../../../prisma/main.js";

const requestPasswordChange = async (req, res) => {
  let { email } = req.body;

  if (!email) {
    return res.json({
      message: "Missing required fields",
      error: true,
    });
  }

  const user = await prisma.user.findFirst({ where: { email } });

  if (!user) {
    return res.status(400).json({
      message: "User does not exist",
      error: true,
    });
  }

  const otpCode = Math.floor(Math.random() * 1000000 + 100000)
    .toString()
    .slice(0, 6);

  prisma.oTP
    .create({
      data: {
        uid: user.id,
        code: otpCode,
        expiresAt: new Date(Date.now() + 1000 * 10 * 60),
      },
    })
    .then(async (otpResponse) => {
      var message = {
        from: "Rise Addis Properties: ",
        to: user.email,
        subject: "Password Reset Request",
        html: resetPasswordText({ name: user.name, code: otpCode }),
      };

      var transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: "riseaddis1@gmail.com",
          pass: "kkkx mbdv xdiq dshf",
        },
      });

      try {
        transporter
          .sendMail(message)
          .then(async (response) => {
            console.log("Reset message is sent!", response.response);

            return res.status(200).json({
              message: "OTP is sent successfully to your email address",
              otp: otpResponse.id,
              error: false,
            });
          })
          .catch((err) => {
            console.log(err);
            return res.status(500).json({
              message: "Failed to send OTP, please try again",
              error: true,
            });
          });
      } catch (error) {
        console.log(error.message);

        return res.status(500).json({
          message: "Failed to send OTP, please try again",
          error: true,
        });
      } finally {
        transporter.close();
      }
    })
    .catch((error) => {
      console.log(error);
      return res.status(500).json({
        message: "Server error, please try again",
        error: true,
      });
    });
};

export default requestPasswordChange;
