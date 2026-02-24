import express from "express";
import type { Request, Response } from "express";

const app = express();
const port = process.env["PORT"] || 3000;

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.json({ message: "SaaS Control API is running!" });
});

app.listen(port, () => {
  console.log(`🔥 Server started at http://localhost:${port}`);
});
