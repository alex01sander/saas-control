import { z } from "zod";

export const createPlanSchema = z.object({
    name: z.string().min(2, "O nome do plano deve ter pelo menos 2 caracteres"),
    priceCents: z
        .number()
        .int()
        .positive("O preço deve ser um valor inteiro e positivo"),
    interval: z.enum(["month", "year"], {
        message: "O intervalo deve ser 'month' ou 'year' e é obrigatório",
    }),
});

export type CreatePlanDTO = z.infer<typeof createPlanSchema>;
