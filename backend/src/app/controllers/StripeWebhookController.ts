import type { Request, Response } from "express";
import Stripe from "stripe";
import StripeService from "../services/StripeService.js";

const stripe = new Stripe(process.env.STRIPE_API_KEY as string);

class StripeWebhookController {
    async handle(req: Request, res: Response) {
        const sig = req.headers["stripe-signature"];
        const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

        let event;

        // Allow simulation via Postman in development if signature is missing
        if (!sig && process.env.NODE_ENV !== "production") {
            console.log("⚠️ Webhook simulation detected (Dev Mode)");
            event = req.body;
        } else {
            try {
                event = stripe.webhooks.constructEvent(
                    req.body,
                    sig as string,
                    endpointSecret as string,
                );
            } catch (err: any) {
                console.error(`❌ Webhook Error: ${err.message}`);
                return res.status(400).send(`Webhook Error: ${err.message}`);
            }
        }

        if (event.type === "checkout.session.completed") {
            const session = event.data.object as Stripe.Checkout.Session;
            await StripeService.handleCheckoutSessionCompleted(session);
        }

        return res.status(200).json({ received: true });
    }
}

export default new StripeWebhookController();
