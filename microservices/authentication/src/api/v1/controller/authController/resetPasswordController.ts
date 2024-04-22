require('dotenv').config();
import { Request, Response, NextFunction } from "express";
import bcrypt from 'bcryptjs';
import jwt from "jsonwebtoken";
import { resetPasswordSchema } from "../../validations/authZod";
import { IReset } from "../../interfaces/types/authTypes";
import { reset, updatedPassword } from "../../service/authService/resetService";

export const resetPasswordController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { user_id, token, password } = resetPasswordSchema.parse(req.body as IReset);

    const user = await reset(user_id);

    if (!user || user_id !== user.user_id) {
      return res.status(401).json({ success: false, message: "Invalid User" });
    }

    const jwtSecret = process.env.JWT_SECRET || 'fallback-secret' + user.password;

    const decodedToken = jwt.verify(token, jwtSecret);

    if (!decodedToken) {
      return res.status(400).json({ success: false, message: "Invalid or expired token" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await updatedPassword(user_id, hashedPassword);

    return res.status(200).json({ success: true, message: "Password updated successfully" });
  } catch (error) {
    next(error);
  }
};