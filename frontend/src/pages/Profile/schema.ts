import * as zod from 'zod';

export const profileFormSchema = zod.object({
  name: zod.string().min(3, 'O nome deve ter pelo menos 3 caracteres'),
  email: zod.string().email(), // Removido o disabled() pois o Zod não tem essa função por padrão na versão comum; o controle será via UI e schema opcional se necessário.
  currentPassword: zod.string().optional(),
  newPassword: zod.string().min(6, 'A nova senha deve ter 6+ caracteres').optional().or(zod.literal('')),
});

export type ProfileFormData = zod.infer<typeof profileFormSchema>;
