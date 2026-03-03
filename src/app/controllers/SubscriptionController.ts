import type { Request, Response } from "express";
import SubscriptionService from "../services/SubscriptionService.js";

class SubscriptionController {
    async store(req: Request, res: Response) {
        const { planId } = req.body;
        const userId = req.user.id;

        if (!planId) {
            return res.status(400).json({ message: "Plan ID is required" });
        }

        const subscription = await SubscriptionService.subscribe({
            userId,
            planId,
        });

        return res.status(201).json(subscription);
    }

    async show(req: Request, res: Response) {
        const userId = req.user.id;

        const subscription =
            await SubscriptionService.getUserSubscription(userId);

        return res.json(subscription);
    }
}

export default new SubscriptionController();
