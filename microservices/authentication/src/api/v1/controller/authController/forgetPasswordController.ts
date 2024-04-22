import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { forgetPasswordSchema } from "../../validations/authZod";
import { IForget } from "../../interfaces/types/authTypes";
import { findUserByEmail } from "../../service/authService/registerService";
import { forget } from "../../service/authService/forgetService";
import { sendMail } from "../../service/smtpService/smtpService";

export const forgetPasswordController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email } = forgetPasswordSchema.parse(req.body as IForget);

    const validEmail = await findUserByEmail(email);

    if (!validEmail || !validEmail.email) {
      return res.status(404).json({ success: false, message: 'We couldn\'t find your account with that information' });
    }

    const user = await forget(email);
    if (!user) {
      return res.status(404).json({ success: false, message: 'We couldn\'t find your account with that information' });
    }

    const token = await generateForgetPasswordToken(email, user);
    const emailSent = await sendForgetPasswordEmail(email, user, token);

    if (emailSent) {
      return res.status(200).json({ success: true, message: 'Email has been sent successfully' });
    } else {
      return res.status(400).json({ success: false, message: 'Error in sending email. Try again later' });
    }
  } catch (error) {
    next(error)
  }
};

// Function to generate forget password token
const generateForgetPasswordToken = async (email: string, user: any) => {
  const jwtSecret = process.env.JWT_SECRET || 'key' + user.password;
  const payload = {
    email: email,
    id: user.user_id,
  };
  const token = jwt.sign(payload, jwtSecret, { expiresIn: '15m' });
  return token;
};

// Function to send forget password email
const sendForgetPasswordEmail = async (email: string, user: any, token: string) => {
  const link = `${process.env.DOMAIN_LINK}/reset-password/${user.user_id}/${token}`;
  const responseMessage = await sendMail(email, 'Forget Password Mail', link);
  return responseMessage;
};