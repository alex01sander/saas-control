import AppError from "../../errors/AppError.js";
import SubscriptionRepository from "../repositories/SubscriptionRepository.js";
import PlansRepository from "../repositories/PlansRepository.js";

interface ISubscribeRequest {
    userId: string;
    planId: string;
}

class SubscriptionService {
    async subscribe({ userId, planId }: ISubscribeRequest) {
        const plan = await PlansRepository.findById(planId);
        if (!plan) {
            throw new AppError("Plan not found", 404);
        }

        const existingSubscription =
            await SubscriptionRepository.findByUserId(userId);

        if (existingSubscription) {
            return await SubscriptionRepository.update(userId, {
                planId,
                status: "ACTIVE",
            });
        }

        return await SubscriptionRepository.create({
            userId,
            planId,
            status: "ACTIVE",
        });
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
