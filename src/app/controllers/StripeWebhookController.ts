import type { Request, Response } from "express";
import Stripe from "stripe";
import SubscriptionRepository from "../repositories/SubscriptionRepository.js";
import UsersRepository from "../repositories/UsersRepository.js";

const stripe = new Stripe(process.env.STRIPE_API_KEY as string);

class StripeWebhookController {
    async handle(req: Request, res: Response) {
        const sig = req.headers["stripe-signature"];
        const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

        let event;

        try {
            event = stripe.webhooks.constructEvent(
                req.body,
                sig as string,
                endpointSecret as string,
            );
        } catch (err: any) {
            return res.status(400).send(`Webhook Error: ${err.message}`);
        }

        if (event.type === "checkout.session.completed") {
            const session = event.data.object as Stripe.Checkout.Session;

            const userId = session.metadata?.userId;
            const planId = session.metadata?.planId;

            const stripeCustomerId = session.customer as string;

            if (userId && planId) {
                await SubscriptionRepository.update(userId, {
                    status: "ACTIVE",
                    planId: planId,
                });

                await UsersRepository.update(userId, {
                    stripeCustomerId: stripeCustomerId,
                });

                console.log(
                    `✅ Assinatura e CustomerID (${stripeCustomerId}) atualizados para o usuário: ${userId}`,
                );
            }
        }
    }
}

export default new StripeWebhookController();
