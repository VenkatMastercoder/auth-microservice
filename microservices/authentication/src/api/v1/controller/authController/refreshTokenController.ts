require('dotenv').config();
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { refreshTokenSchema } from '../../validations/authZod';
import { IRefresh } from '../../interfaces/types/authTypes';

export const refreshTokenController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { refresh_token } = refreshTokenSchema.parse(req.body as IRefresh);

    // Check if the refresh token exists
    if (!refresh_token) {
      return res.status(401).json({ success: false, message: 'Refresh token is missing' });
    }

    // Verify the refresh token
    jwt.verify(refresh_token, process.env.REFRESH_TOKEN || 'key' as string, (err: any, user: any) => {
      if (err) {
        return res.status(403).json({ success: false, message: 'Invalid refresh token' });
      }

      // Generate a new access token
      const accessToken = jwt.sign({ username: user.user_id }, process.env.ACCESS_TOKEN as string, {
        expiresIn: '15m',
      });

      // Return the new access token
      res.status(200).json({ success: true, token: { accessToken } });
    });
  } catch (error) {
    next(error)
  }
};