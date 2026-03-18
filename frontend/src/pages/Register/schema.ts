import * as zod from "zod";

export const registerFormSchema = zod
    .object({
        name: zod.string().min(3, "O nome deve ter pelo menos 3 caracteres"),
        email: zod.string().email("Digite um e-mail válido"),
        password: zod
            .string()
            .min(6, "A senha deve ter pelo menos 6 caracteres"),
        confirmPassword: zod.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "As senhas não coincidem",
        path: ["confirmPassword"],
    });

export type RegisterFormData = zod.infer<typeof registerFormSchema>;
