import { Request, Response, NextFunction } from "express";
import prisma from "../../../../../prisma/client/prismaClient";
import bcrypt from "bcryptjs";
import { changePasswordSchemma } from "../../validations/authZod";
import { IChangePassword } from "../../interfaces/types/authTypes";

export const changePasswordController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { user_id, current_password, new_password } = changePasswordSchemma.parse(req.body as IChangePassword);

    // Validation of parameters
    if (!user_id || !current_password || !new_password) {
      return res.status(400).json({ success: false, message: 'Missing parameters' });
    }

    // Fetch user with password from database
    const user = await prisma.user.findUnique({
      where: { user_id },
      select: { password: true }
    });

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    // Verify current password
    const isPasswordValid = await comparePasswords(current_password, user.password as string);

    if (!isPasswordValid) {
      return res.status(401).json({ success: false, message: 'Incorrect current password' });
    }

    // Update password
    const hashedNewPassword = await bcrypt.hash(new_password, 10);
    await prisma.user.update({
      where: { user_id },
      data: { password: hashedNewPassword }
    });

    return res.status(200).json({ success: true, message: 'Password updated successfully' });
  } catch (error) {
    next(error);
  }
};

async function comparePasswords(inputPassword: string, hashedPassword: string) {
  try {
    const match = await bcrypt.compare(inputPassword, hashedPassword);
    return match;
  } catch (error) {
    throw new Error('Error comparing passwords');
  }
}