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
            role: user.role,
        });
    }

    async toggleRole(req: Request, res: Response) {
        if (process.env.NODE_ENV === "production") {
            return res.status(403).json({ message: "This feature is only available in development mode" });
        }

        const userId = req.user.id;
        const user = await UsersRepository.findById(userId);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const newRole = user.role === "ADMIN" ? "CLIENT" : "ADMIN";

        await UsersRepository.update(userId, { role: newRole });

        return res.json({ role: newRole });
    }
}

export default new UsersController();