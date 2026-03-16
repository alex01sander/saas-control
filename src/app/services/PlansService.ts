import type { Plan, Prisma } from "@prisma/client";
import AppError from "../../errors/AppError.js";
import PlansRepository from "../repositories/PlansRepository.js";

interface IPlanCreate {
    name: string;
    priceCents: number;
    interval: "month" | "year";
}

interface IPlanUpdate {
    name?: string;
    priceCents?: number;
    interval?: "month" | "year";
}

class PlansService {
    async create({ name, priceCents, interval }: IPlanCreate): Promise<Plan> {
        const planExists = await PlansRepository.findByName(name);
        if (planExists) {
            throw new AppError("Plan already exists", 400);
        }

        const plan = await PlansRepository.create({
            name,
            priceCents,
            interval,
        });
        return plan;
    }

    async listAll(): Promise<Plan[]> {
        return await PlansRepository.findAll();
    }

    async update(id: string, { name, priceCents, interval }: IPlanUpdate): Promise<Plan> {
        const plan = await PlansRepository.findById(id);
        if (!plan) {
            throw new AppError("Plan not found", 404);
        }

        if (name) {
            const planWithSameName = await PlansRepository.findByName(name);

            if (planWithSameName && planWithSameName.id !== id) {
                throw new AppError(
                    "This plan name is already in use by another plan",
                    400,
                );
            }
        }

        const updateData: Prisma.PlanUpdateInput = {};

        if (name) updateData.name = name;
        if (interval) updateData.interval = interval;
        if (priceCents !== undefined) updateData.priceCents = priceCents;

        const updatedPlan = await PlansRepository.update(id, updateData);
        return updatedPlan;
    }

    async delete(id: string) {
        const plan = await PlansRepository.findById(id);
        if (!plan) {
            throw new AppError("Plan not found", 404);
        }
        await PlansRepository.delete(id);
        return;
    }
}

export default new PlansService();
