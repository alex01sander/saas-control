import type { Request, Response } from "express";
import SubscriptionService from "../services/SubscriptionService.js";
import StripeService from "../services/StripeService.js";

class SubscriptionController {
    async store(req: Request, res: Response) {
        const { planId } = req.body;
        const userId = req.user.id;

        if (!planId) {
            return res.status(400).json({ message: "Plan ID is required" });
        }

        try {
            const subscription = await SubscriptionService.subscribe({
                userId,
                planId,
            });

            return res.status(201).json(subscription);
        } catch (error: any) {
            console.error("❌ Erro ao criar checkout:", error.message || error);
            return res.status(500).json({
                status: "error",
                message: error.message || "Erro ao criar sessão de checkout",
            });
        }
    }

    async show(req: Request, res: Response) {
        const userId = req.user.id;

        const subscription =
            await SubscriptionService.getUserSubscription(userId);

        return res.json(subscription);
    }

    async createPortal(req: Request, res: Response) {
        const userId = req.user.id;

        const portalUrl = await StripeService.getPortalSessionUrl(userId);

        return res.json({ url: portalUrl });
    }

    async forceActive(req: Request, res: Response) {
        // Only allow in development
        if (process.env.NODE_ENV === "production") {
            return res.status(403).json({ message: "Forbidden in production" });
        }

        const userId = req.user.id;
        const { planId } = req.body;

        if (!planId) {
            return res.status(400).json({ message: "Plan ID is required" });
        }

        await SubscriptionService.forceActivate(userId, planId);

        return res.json({ message: "Subscription activated successfully (DEV MODE)" });
    }
}

export default new SubscriptionController();
