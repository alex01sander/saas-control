import type { Request, Response } from "express";
import UsersService from "../services/UsersService.js";

class UsersController {
    async index(req: Request, res: Response) {
        const users = await UsersService.listAll();
        return res.json(users);
    }

    async store(req: Request, res: Response) {
        const { name, email, password } = req.body;

        const user = await UsersService.create({
            name,
            email,
            password,
        });

        return res.status(201).json(user);
    }
}

export default new UsersController();
