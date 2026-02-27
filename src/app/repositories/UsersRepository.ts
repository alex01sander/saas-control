import { type Prisma, type User } from "@prisma/client";
import { prisma } from "../../database/client.js";

class UserRepository {
    async findAll() {
        return await prisma.user.findMany({
            select: {
                id: true,
                name: true,
                email: true,
                createdAt: true,
            },
            orderBy: {
                createdAt: "desc",
            },
        });
    }

    async findByEmail(email: string) {
        const User = await prisma.user.findUnique({
            where: {
                email,
            },
        });
        return User;
    }

    async findById(id: string): Promise<User | null> {
        const user = await prisma.user.findUnique({
            where: {
                id,
            },
        });
        return user;
    }

    async create(data: Prisma.UserCreateInput): Promise<User> {
        const user = await prisma.user.create({
            data,
        });
        return user;
    }

    async update(id: string, data: Prisma.UserUpdateInput): Promise<User> {
        const user = await prisma.user.update({
            where: { id },
            data,
        });

        return user;
    }
}

export default new UserRepository();
