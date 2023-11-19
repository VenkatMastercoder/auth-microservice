
import express, { Express, Request, Response } from 'express';
export const app: Express = express();
import cors from 'cors';
import indexRouter from './Router/index'

app.use(express.json());

app.use(cors());

app.use("/api/v1", indexRouter);

app.get('/', (req: Request, res: Response) => {
  res.send('THIS IS FROM BACKEND');
});

app.all("*",indexRouter);

