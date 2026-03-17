import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { authConfig } from "../config/auth.js";
import AppError from "../errors/AppError.js";

interface ITokenPayload {
    iat: number;
    exp: number;
    sub: string;
}

export function ensureAuthenticated(
    req: Request,
    res: Response,
    next: NextFunction,
) {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        throw new AppError("JWT token is missing", 401);
    }

    const [, token] = authHeader.split(" ");

    try {
        const { secret } = authConfig.jwt;

        // @ts-ignore
        const decoded = jwt.verify(token, secret as string);

        const { sub } = decoded as ITokenPayload;

        req.user = {
            id: sub,
        };

        return next();
    } catch {
        throw new AppError("Invalid JWT token", 401);
    }
}
