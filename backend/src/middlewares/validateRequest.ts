import type { Request, Response, NextFunction } from "express";
import { ZodError, type ZodObject } from "zod";

export const validate =
    (schema: ZodObject<any>) =>
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            req.body = await schema.parseAsync(req.body);
            return next();
        } catch (error) {
            if (error instanceof ZodError) {
                return res.status(400).json({
                    message: "Validation failed",
                    errors: error.issues.map((err) => ({
                        field: err.path[0],
                        message: err.message,
                    })),
                });
            }
            return res.status(500).json({ message: "Internal server error" });
        }
    };
