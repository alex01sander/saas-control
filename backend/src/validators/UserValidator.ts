import { z } from "zod";

export const createUserSchema = z.object({
    name: z.string().min(3, "O nome deve ter pelo menos 3 caracteres"),
    email: z.string().email("E-mail inválido"),
    password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres"),
});

export const updateUserSchema = z
    .object({
        name: z.string().optional(),
        email: z.string().email("E-mail inválido").optional(),
        old_password: z.string().optional(),
        password: z
            .string()
            .min(6, "A nova senha deve ter pelo menos 6 caracteres")
            .optional(),
    })
    .refine(
        (data) => {
            if (data.password && !data.old_password) {
                return false;
            }
            return true;
        },
        {
            message:
                "Você precisa informar a senha antiga para definir uma nova",
            path: ["old_password"],
        },
    );
