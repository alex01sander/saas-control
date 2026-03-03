import { prisma } from "../../database/client.js";
import type { Subscription, Prisma } from "@prisma/client";

class SubscriptionRepository {
    async findByUserId(userId: string): Promise<Subscription | null> {
        return await prisma.subscription.findUnique({
            where: { userId },
            include: { plan: true },
        });
    }

    async create(
        data: Prisma.SubscriptionUncheckedCreateInput,
    ): Promise<Subscription> {
        return await prisma.subscription.create({
            data,
        });
    }

    async update(
        userId: string,
        data: Prisma.SubscriptionUncheckedUpdateInput,
    ): Promise<Subscription> {
        return await prisma.subscription.update({
            where: { userId },
            data,
        });
    }

    async delete(id: string): Promise<void> {
        await prisma.subscription.delete({
            where: { id },
        });
    }
}

export default new SubscriptionRepository();
