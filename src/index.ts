import "dotenv/config";
import express from "express";
import type { NextFunction, Request, Response } from "express";
import router from "./routes.js";
import AppError from "./errors/AppError.js";

const app = express();
const port = process.env["PORT"] || 3000;

app.use(express.json());
app.use(router);

app.use((error: AppError, req: Request, res: Response, next: NextFunction) => {
    console.error(error);

    return res.status(error.statusCode || 500).json({
        message: error.message || "Internal server error",
    });
});

app.listen(port, () => {
    console.log(`🔥 Server started at http://localhost:${port}`);
});
