import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcryptjs';
import { loginSchema } from '../../validations/authZod';
import { ILogin } from '../../interfaces/types/authTypes';
import { login } from '../../service/authService/loginService';
import { sendToken } from '../../service/jwtService/jwt';

export const loginController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = loginSchema.parse(req.body as ILogin);

    const user = await login(email);

    if (!user) {
      return res.status(401).json({ success: false, message: 'Invalid email or password' });
    }

    // for Google or Normal Login
    if (user.provider_type === "google" || (user.password && await bcrypt.compare(password, user.password))) {
      return sendToken(user, res);
    }

    res.status(401).json({ success: false, message: 'Invalid email or password' });
  } catch (error) {
    next(error);
  }
};