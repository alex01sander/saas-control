import "dotenv/config";
import express from "express";
import type { NextFunction, Request, Response } from "express";
import router from "./routes.js";
import AppError from "./errors/AppError.js";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./config/swagger.js";

const app = express();
const port = process.env["PORT"] || 3000;

app.use(cors());

app.use((req, res, next) => {
    if (req.originalUrl === "/webhooks/stripe") {
        next();
    } else {
        express.json()(req, res, next);
    }
});
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
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

export default app;
