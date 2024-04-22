import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import prisma from "../../../../../prisma/client/prismaClient";
import { VerifyActivationTokenSchema } from "../../validations/authZod";
import { IVerifyActivationToken } from "../../interfaces/types/authTypes";

export const verfiyActivationTokenController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { token, user_id } = VerifyActivationTokenSchema.parse(req.body as IVerifyActivationToken);

  try {
    const jwtSecret = process.env.JWT_SECRET || 'default_secret_key';
    const decodedToken: any = jwt.verify(token, jwtSecret);

    if (decodedToken && decodedToken.user_id === user_id) {
      await prisma.user.update({
        where: { user_id: decodedToken.user_id },
        data: {
          email_isverified: true,
        },
      });

      return res.status(200).json({ success: true, message: "User email verified successfully" });
    } else {
      return res.status(401).json({ success: false, message: "Invalid or missing token, or mismatched user ID" });
    }
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      return res.status(401).json({ success: false, message: "Token has expired, please request a new verification link" });
    } else if (error instanceof jwt.JsonWebTokenError) {
      return res.status(401).json({ success: false, message: "Invalid token" });
    } else {
      console.error(error);
      next(error);
    }
  }
};