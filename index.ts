import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";

dotenv.config();

const app: Express = express();
const port: string | number = process.env.PORT || 4000;

app.get("/", (_req: Request, res: Response) => {
  return res.json("Care chimpa funziona papu");
});

app.listen(port, () => console.log(`Listening on port: ${port}`));
