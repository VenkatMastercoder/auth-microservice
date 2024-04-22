import express, { Router } from "express";
import authRouter from "./authRouter/authRouter";
import protectedRouter from "./protectedRouter/protectedRouter";
import { authenticateToken } from "../middleware/authMiddleware";

const router: Router = express.Router();

router.use('/user', authenticateToken, protectedRouter);
router.use('/auth', authRouter);

export default router;