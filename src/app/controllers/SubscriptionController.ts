import type { Request, Response } from "express";
import SubscriptionService from "../services/SubscriptionService.js";
import UsersRepository from "../repositories/UsersRepository.js";
import StripeService from "../services/StripeService.js";

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

    async createPortal(req: Request, res: Response) {
        const userId = req.user.id;

        const user = await UsersRepository.findById(userId);

        if (!user?.stripeCustomerId) {
            return res
                .status(400)
                .json({ message: "User does not have a Stripe Customer ID" });
        }

        const portalUrl = await StripeService.createPortalSession(
            user.stripeCustomerId,
        );

        return res.json({ url: portalUrl });
    }
}

export default new SubscriptionController();
