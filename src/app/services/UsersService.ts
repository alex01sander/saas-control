import { hash } from "bcryptjs";
import AppError from "../../errors/AppError.js";
import UsersRepository from "../repositories/UsersRepository.js";

interface IUser {
    name: string;
    email: string;
    password: string;
}

class UsersService {
    async listAll(): Promise<any> {
        return await UsersRepository.findAll();
    }

    async create({ name, email, password }: IUser): Promise<any> {
        const emailExist = await UsersRepository.findByEmail(email);

        if (emailExist) {
            throw new AppError("Email already exists", 400);
        }

        const passwordHash = await hash(password, 10);

        const user = await UsersRepository.create({
            name,
            email,
            passwordHash,
        });

        const userWithoutPassword = {
            id: user.id,
            name: user.name,
            email: user.email,
            createdAt: user.createdAt,
        };

        return userWithoutPassword;
    }
}

export default new UsersService();
