import { Request, Response, NextFunction } from "express";

export const protectedController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    res.json({ message: "Sample Message from Venkat Starter Template from Service - 1" });
  } catch (error) {
    next(error);
  }
};