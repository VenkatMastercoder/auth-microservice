import jwt from "jsonwebtoken";
import { Response } from "express";
import prisma from "../../../../../prisma/client/prismaClient";
import { IUser } from "../../interfaces/types/authTypes";

export const sendToken = async (user: IUser, res: Response) => {
  try {

    const access_token = jwt.sign({ user_id: user.user_id }, process.env.ACCESS_TOKEN || 'key', { expiresIn: '15m' });
    const refresh_token = jwt.sign({ user_id: user.user_id }, process.env.REFRESH_TOKEN || 'key', { expiresIn: '7d' });

    const refreshExpiresAt = new Date();
    refreshExpiresAt.setDate(refreshExpiresAt.getDate() + 7);

    const { password, ...userData } = user;
    const token = {
      access_token,
      refresh_token
    }

    await prisma.account.upsert({
      where: { user_id: user.user_id },
      update: {
        refresh_token: refresh_token,
        refresh_expires_at: refreshExpiresAt,
      },
      create: {
        user_id: user.user_id,
        refresh_token: refresh_token,
        refresh_expires_at: refreshExpiresAt,
      },
    });

    return res.status(200).json({ success: true, data: userData, token: token });
  }
  catch (error) {
    throw error
  }
}