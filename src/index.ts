import "dotenv/config";
import express from "express";
import type { NextFunction, Request, Response } from "express";
import router from "./routes.js";
import AppError from "./errors/AppError.js";

const app = express();
const port = process.env["PORT"] || 3000;

app.use(express.json());
app.use(router);

app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
    if (error instanceof AppError) {
        return res.status(error.statusCode).json({
            status: "error",
            message: error.message,
        });
    }

    console.error("❌ Erro não tratado:", error);

    return res.status(500).json({
        status: "error",
        message: "Internal server error",
    });
});

app.listen(port, () => {
    console.log(`🔥 Server started at http://localhost:${port}`);
});
