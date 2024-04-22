import express, { Router } from "express";
import { protectedController } from "../../controller/protectedController/protectedController";

const protectedRouter: Router = express.Router();

protectedRouter.get("/protected", protectedController)

export default protectedRouter;