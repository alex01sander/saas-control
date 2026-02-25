import type { Request, Response } from 'express';
import PlansService from "../services/PlansService.js";

class PlansController {
    async index(req: Request, res: Response){
        const plans = await PlansService.listAll();
        return res.json(plans);
    }

    async store(req: Request, res: Response){
        const { name, price, interval } = req.body;
        const plan = await PlansService.create({ name, price, interval });
        return res.json(plan);
    }
}

export default new PlansController();
