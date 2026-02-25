import type { Plan, Prisma } from "@prisma/client";
import AppError from "../../errors/AppError.js";
import PlansRepository from "../repositories/PlansRepository.js";

interface IPlanCreate {
  name: string;
  price: number;
  interval: "month" | "year";
}

interface IPlanUpdate {
  name?: string;
  price?: number;
  interval?: "month" | "year";
}

class PlansService {
  async create({ name, price, interval }: IPlanCreate) {
    const planExists = await PlansRepository.findByName(name);
    if (planExists) {
      throw new AppError("Plan already exists", 400);
    }

    const priceCents = Math.round(price * 100);

    const plan = await PlansRepository.create({ name, priceCents, interval });
    return plan;
  }

  async listAll(): Promise<Plan[]> {
    return await PlansRepository.findAll();
  }

  async update(id: string, { name, price, interval }: IPlanUpdate) {
    
    const plan = await PlansRepository.findById(id);
    if (!plan) {
      throw new AppError("Plan not found", 404);
    }

    if (name) {
      const planWithSameName = await PlansRepository.findByName(name);
      
      if (planWithSameName && planWithSameName.id !== id) {
        throw new AppError("This plan name is already in use by another plan", 400);
      }
    }

    const priceCents = price ? Math.round(price * 100) : undefined;
    
   const updateData: Prisma.PlanUpdateInput = {};

    if (name) updateData.name = name;
    if (interval) updateData.interval = interval;
    if (price !== undefined) {
        updateData.priceCents = Math.round(price * 100);
    }

const updatedPlan = await PlansRepository.update(id, updateData);
    return updatedPlan;
}

async delete(id: string) {
    const plan = await PlansRepository.findById(id);
    if (!plan) {
      throw new AppError("Plan not found", 404);
    }
    await PlansRepository.delete(id);
    return
}
}

export default new PlansService();
