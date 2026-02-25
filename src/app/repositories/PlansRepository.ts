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

   async findById(id: string): Promise<Plan | null>{
    const plan = await prisma.plan.findUnique({
        where: {
            id
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

   async update(id: string, data: Prisma.PlanUpdateInput): Promise<Plan>{
    return await prisma.plan.update({
        where: {id},
        data
    })
   }

   async delete(id: string): Promise<void>{
    await prisma.plan.delete({
        where: {id}
    })
   }
}

export default new PlansRepository()
