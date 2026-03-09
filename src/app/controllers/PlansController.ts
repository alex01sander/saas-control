import type { Request, Response } from "express";
import PlansService from "../services/PlansService.js";
import PlansRepository from "../repositories/PlansRepository.js";

class PlansController {
    async index(req: Request, res: Response) {
        const plans = await PlansService.listAll();
        return res.json(plans);
    }

    async store(req: Request, res: Response) {
        const { name, priceCents, interval } = req.body;

        const plan = await PlansRepository.create({
            name,
            priceCents,
            interval,
        });

        return res.status(201).json(plan);
    }

    async update(req: Request, res: Response) {
        const { id } = req.params as { id: string };

        const data = req.body;

        const plan = await PlansRepository.update(id, data);

        return res.json(plan);
    }

    async delete(req: Request, res: Response) {
        const { id } = req.params as { id: string };
        await PlansService.delete(id);
        return res.status(204).send();
    }
}

export default new PlansController();
