import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import bcrypt from 'bcryptjs';
import { AppError } from '../../middleware/errorHanding';
import { registerSchema } from "../../validations/authZod";
import { IRegister } from '../../interfaces/types/authTypes';
import { findUserByEmail, googleRegister, normalRegister } from '../../service/authService/registerService';
import { sendMail } from '../../service/smtpService/smtpService';

export const registerController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, name, password, profile_url, provider_type } = registerSchema.parse(req.body as IRegister);

    const existingUser = await findUserByEmail(email);

    if (existingUser) {
      return res.status(409).json({ success: false, message: 'Email is already registered' });
    }

    let newUser;

    if (provider_type === 'google') {
      newUser = await googleRegister(email, profile_url, name, provider_type);
    } else if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      newUser = await normalRegister(email, hashedPassword, profile_url, name, provider_type);

      const token = createJwtToken(newUser);
      const { success } = await sendVerificationEmail(newUser, token);

      if (!success) {
        throw new AppError("Try Again After Some Time", 500);
      }
    }

    return res.status(200).json({
      success: true,
      message: 'User Registered',
      data: { user_id: newUser?.user_id }
    });

  } catch (error) {
    next(error);
  }
};

const createJwtToken = (user: any) => {
  const jwtSecret = process.env.JWT_SECRET || 'key';
  const payload = {
    user_id: user.user_id,
    email: user.email,
    is_verified: user.email_isverified
  };
  return jwt.sign(payload, jwtSecret, { expiresIn: '15m' });
};

const sendVerificationEmail = async (user: any, token: any) => {
  const link = `${process.env.DOMAIN_LINK}/verify-account/${token}`;
  return sendMail(user.email, 'Verify Email Address', link);
};