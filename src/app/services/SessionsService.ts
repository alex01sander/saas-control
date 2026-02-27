import { compare } from "bcryptjs";
import jwt from "jsonwebtoken";
import AppError from "../../errors/AppError.js";
import UsersRepository from "../repositories/UsersRepository.js";
import { authConfig } from "../../config/auth.js";

interface IRequest {
    email: string;
    password: string;
}

interface IResponse {
    user: {
        id: string;
        name: string;
        email: string;
    };
    token: string;
}

class SessionsService {
    async create({ email, password }: IRequest): Promise<IResponse> {
        const user = await UsersRepository.findByEmail(email);

        if (!user) {
            throw new AppError("E-mail ou senha incorretos", 401);
        }

        const passwordMatched = await compare(password, user.passwordHash);

        if (!passwordMatched) {
            throw new AppError("E-mail ou senha incorretos", 401);
        }

        const { secret, expiresIn } = authConfig.jwt;
        const { sign } = jwt;

        const token = sign({}, secret, {
            subject: user.id,
            expiresIn: expiresIn as any,
        });

        return {
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
            },
            token,
        };
    }
}

export default new SessionsService();
