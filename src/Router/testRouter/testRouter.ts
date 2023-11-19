import express, { NextFunction, Request, Response, Router } from 'express';

const testRouter: Router = express.Router();

testRouter.get('/', (req: Request, res: Response, next: NextFunction) => {
  try {
    res.status(200).json({ success: true, message: "WORKING FINE : V1" });
  } catch (error) {
    next(error);
  }
});

export default testRouter