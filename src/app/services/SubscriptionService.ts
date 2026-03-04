import AppError from "../../errors/AppError.js";
import SubscriptionRepository from "../repositories/SubscriptionRepository.js";
import PlansRepository from "../repositories/PlansRepository.js";
import UsersRepository from "../repositories/UsersRepository.js";
import StripeService from "./StripeService.js";

interface ISubscribeRequest {
    userId: string;
    planId: string;
}

class SubscriptionService {
    async subscribe({ userId, planId }: ISubscribeRequest) {
        const plan = await PlansRepository.findById(planId);
        if (!plan) throw new AppError("Plan not found", 404);

        const user = await UsersRepository.findById(userId);
        if (!user) throw new AppError("User not found", 404);

        const checkoutUrl = await StripeService.createCheckoutSession(
            user.id,
            user.email,
            plan.name,
            plan.priceCents,
            plan.interval,
            plan.id,
        );

        return { checkoutUrl };
    }

    async getUserSubscription(userId: string) {
        const subscription = await SubscriptionRepository.findByUserId(userId);
        if (!subscription) {
            throw new AppError(
                "No active subscription found for this user",
                404,
            );
        }
        return subscription;
    }
}

export default new SubscriptionService();
