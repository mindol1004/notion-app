import { z } from "zod";

export const registerSchema = z.object({
  email: z.string().min(1, "auth.emailRequired").email("auth.emailInvalid"),
  password: z.string().min(1, "auth.passwordRequired").min(6, "auth.passwordMin"),
  name: z.string().optional(),
});

export type RegisterFormValues = z.infer<typeof registerSchema>;

export interface RegisterFormProps {
  onSuccess?: (values: RegisterFormValues) => void;
  onError?: (error: Error | z.ZodError) => void;
}