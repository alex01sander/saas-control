import type { Request, Response } from "express";
import UsersService from "../services/UsersService.js";

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
}

export default new UsersController();