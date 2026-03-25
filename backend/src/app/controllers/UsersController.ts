import type { Request, Response } from "express";
import UsersService from "../services/UsersService.js";
import UsersRepository from "../repositories/UsersRepository.js";
import SubscriptionRepository from "../repositories/SubscriptionRepository.js";

class UsersController {
    async index(req: Request, res: Response) {
        const users = await UsersService.listAll();
        return res.json(users);
    }

    async store(req: Request, res: Response) {
        
        const user = await UsersService.create(req.body);

        return res.status(201).json(user);
    }

    async update(req: Request, res: Response) {
        const user_id = req.user.id;
        
       
        const user = await UsersService.update(user_id, req.body);

        return res.json(user);
    }

    async me(req: Request, res: Response) {
        const userId = req.user.id;

        const user = await UsersRepository.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const subscription = await SubscriptionRepository.findByUserId(userId);

        return res.json({
            id: user.id,
            name: user.name,
            email: user.email,
            subscriptionStatus: subscription?.status || "PENDING",
        });
    }
}

export default new UsersController();