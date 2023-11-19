import { Request, Response } from 'express';

export const registerController = async (req: Request, res: Response) => {
  try {
    // Write Your Controller code Here 
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error });
  }
};
