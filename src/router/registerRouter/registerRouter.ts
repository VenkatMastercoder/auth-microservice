import express, { Router } from 'express';
import { registerController } from '../../controller/registerController/registerController';

const registerRouter: Router = express.Router();

registerRouter.post('/register', registerController);

export default registerRouter;