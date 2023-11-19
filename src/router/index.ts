import express, { Router } from "express";
const router: Router = express.Router();

import testRouter from './testRouter/testRouter';
import errorRouter from "./errorRouter/errorRouter";
import registerRouter from './registerRouter/registerRouter';

router.use('/auth', registerRouter);
router.use('/test',testRouter);
router.use("*",errorRouter);

export default router