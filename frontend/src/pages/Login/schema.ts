import * as zod from "zod";

export const loginFormSchema = zod.object({
    email: zod.string().email("Digite um e-mail válido"),
    password: zod.string().min(6, "A senha deve ter pelo menos 6 caracteres"),
});

export type LoginFormData = zod.infer<typeof loginFormSchema>;
