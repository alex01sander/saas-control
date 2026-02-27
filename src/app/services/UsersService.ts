import { hash, compare } from "bcryptjs";
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

    async update(id: string, { name, email, old_password, password }: any) {
        const user = await UsersRepository.findById(id);

        if (!user) {
            throw new AppError("User not found", 404);
        }

        if (email) {
            const userWithUpdatedEmail =
                await UsersRepository.findByEmail(email);

            if (userWithUpdatedEmail && userWithUpdatedEmail.id !== id) {
                throw new AppError("This email is already in use", 400);
            }
            user.email = email;
        }

        if (name) {
            user.name = name;
        }

        if (password) {
            if (!old_password) {
                throw new AppError(
                    "You need to inform the old password to set a new password",
                    400,
                );
            }

            const checkOldPassword = await compare(
                old_password,
                user.passwordHash,
            );

            if (!checkOldPassword) {
                throw new AppError("Old password does not match", 401);
            }

            user.passwordHash = await hash(password, 10);
        }

        const updatedUser = await UsersRepository.update(id, {
            name: user.name,
            email: user.email,
            passwordHash: user.passwordHash,
        });

        return {
            id: updatedUser.id,
            name: updatedUser.name,
            email: updatedUser.email,
        };
    }
}

export default new UsersService();
