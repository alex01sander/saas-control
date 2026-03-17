import { z } from "zod";

export const createSessionSchema = z.object({
  email: z.string().email("E-mail inválido"),
  password: z.string().min(1, "A senha é obrigatória"),
});

export type CreateSessionDTO = z.infer<typeof createSessionSchema>;