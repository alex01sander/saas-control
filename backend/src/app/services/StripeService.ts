import Stripe from "stripe";
import SubscriptionRepository from "../repositories/SubscriptionRepository.js";
import UsersRepository from "../repositories/UsersRepository.js";
import AppError from "../../errors/AppError.js";

const stripe = new Stripe(process.env.STRIPE_API_KEY as string, {
    apiVersion: "2023-10-16" as any,
});

class StripeService {
    async createCheckoutSession(
        userId: string,
        userEmail: string,
        planName: string,
        priceCents: number,
        interval: string,
        planId: string,
    ) {
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            mode: "subscription",
            customer_email: userEmail,
            line_items: [
                {
                    price_data: {
                        currency: "brl",
                        product_data: {
                            name: planName,
                        },
                        unit_amount: priceCents,
                        recurring: {
                            interval: interval === "month" ? "month" : "year",
                        },
                    },
                    quantity: 1,
                },
            ],
            success_url: `${process.env.APP_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${process.env.APP_URL}/cancel`,
            metadata: {
                userId,
                planId,
            },
        });

        return session.url;
    }

    async handleCheckoutSessionCompleted(session: Stripe.Checkout.Session) {
        const userId = session.metadata?.userId;
        const planId = session.metadata?.planId;
        const stripeCustomerId = session.customer as string;

        if (userId && planId) {
            const existingSubscription = await SubscriptionRepository.findByUserId(userId);

            if (existingSubscription) {
                await SubscriptionRepository.update(userId, {
                    status: "ACTIVE",
                    planId: planId,
                });
            } else {
                await SubscriptionRepository.create({
                    userId,
                    planId,
                    status: "ACTIVE",
                });
            }

            await UsersRepository.update(userId, {
                stripeCustomerId: stripeCustomerId,
            });

            console.log(
                `✅ Assinatura e CustomerID (${stripeCustomerId}) atualizados para o usuário: ${userId}`,
            );
        }
    }

    async getPortalSessionUrl(userId: string) {
        const user = await UsersRepository.findById(userId);

        if (!user?.stripeCustomerId) {
            throw new AppError("User does not have a Stripe Customer ID", 400);
        }

        const session = await stripe.billingPortal.sessions.create({
            customer: user.stripeCustomerId,
            return_url: `${process.env.APP_URL}/dashboard`,
        });

        return session.url;
    }

    async createPortalSession(customerId: string) {
        const session = await stripe.billingPortal.sessions.create({
            customer: customerId,
            return_url: `${process.env.APP_URL}/dashboard`,
        });

        return session.url;
    }
}

export default new StripeService();
