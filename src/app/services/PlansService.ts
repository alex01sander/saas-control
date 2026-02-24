import type { Plan } from "@prisma/client";
import AppError from "../../errors/AppError.js";
import PlansRepository from "../repositories/PlansRepository.js";

interface IPlanCreate {
    name: string;
    price: number;
    interval: 'month' | 'year';
}

class PlansService {
    async create({name, price, interval}: IPlanCreate){
        const planExists = await PlansRepository.findByName(name)
        if(planExists){
            throw new AppError('Plan already exists', 400)
        }

        const priceCents = Math.round(price * 100);

        const plan = await PlansRepository.create({name, priceCents, interval })
        return plan
    }

    async listAll(): Promise<Plan[]> {
        return await PlansRepository.findAll();
    }
}

export default new PlansService()
