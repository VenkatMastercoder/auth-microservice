require("dotenv").config();
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import prisma from "../../../../../prisma/client/prismaClient";
import { verifyEmailSchema } from "../../validations/authZod";
import { IVerifyEmail } from "../../interfaces/types/authTypes";
import { sendMail } from "../../service/smtpService/smtpService";

export const verifyEmailController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { user_id, email } = verifyEmailSchema.parse(
      req.body as IVerifyEmail
    );

    const user = await prisma.user.findUnique({
      where: { user_id: user_id },
      select: {
        email_isverified: true,
      },
    });

    const jwtSecret = process.env.JWT_SECRET || 'key' + user?.email_isverified;

    if (user !== null && user?.email_isverified !== true) {

      const payload = {
        user_id: user_id,
        email: email,
        is_verified: user?.email_isverified,
      };

      const token = jwt.sign(payload, jwtSecret);
      const link = `https://www.yourdomain.com/verify-account/${token}`;

      await sendMail(email, "Verfiy Email id", link);

      return res.status(200).json({ success: true });
    }
  } catch (error) {
    next(error);
  }
};