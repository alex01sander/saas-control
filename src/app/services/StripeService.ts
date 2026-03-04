import Stripe from "stripe";

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
}

export default new StripeService();
