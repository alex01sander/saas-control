import type { Request, Response, NextFunction } from "express";
import AppError from "../errors/AppError.js";

export function ensureAdmin(req: Request, res: Response, next: NextFunction) {
    const user = req.user;

    if (!user || (user as any).role !== "ADMIN") {
        throw new AppError("Acesso negado. Apenas administradores podem acessar este recurso.", 403);
    }

    return next();
}
