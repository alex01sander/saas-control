import type { Request, Response, NextFunction } from "express";
import SubscriptionRepository from "../app/repositories/SubscriptionRepository.js";
import AppError from "../errors/AppError.js";

export async function ensureSubscribed(
    req: Request,
    res: Response,
    next: NextFunction,
) {
    const userId = req.user.id;

    const subscription = await SubscriptionRepository.findByUserId(userId);

    if (!subscription || subscription.status !== "ACTIVE") {
        throw new AppError(
            "Subscription active required to access this resource",
            403,
        );
    }

    return next();
}
