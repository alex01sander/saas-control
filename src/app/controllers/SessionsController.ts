import type { Request, Response } from "express";
import SessionsService from "../services/SessionsService.js";

class SessionsController {
    async store(req: Request, res: Response) {
        
        const { email, password } = req.body;

        const sessionData = await SessionsService.create({ 
    email,
    password,
})

        return res.json(sessionData);
    }
}

export default new SessionsController();