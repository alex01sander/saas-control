import { prisma } from "../../database/client.js";
import type { Plan, Prisma } from "@prisma/client";

class PlansRepository {
   async findAll(): Promise<Plan[]>{
    const plans = await prisma.plan.findMany({
        orderBy: {
            createdAt: 'desc'
        }
    })
    return plans
   }

   async findByName(name: string): Promise<Plan | null>{
    const plan = await prisma.plan.findUnique({
        where: {
            name
        }
    })
    return plan
   }
   
   async create(data: Prisma.PlanCreateInput): Promise<Plan>{
    const plan = await prisma.plan.create({
        data
    })
    return plan
   }
}

export default new PlansRepository()
