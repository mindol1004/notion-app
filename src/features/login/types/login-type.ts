import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email('auth.emailInvalid'),
  password: z.string().min(1, 'auth.passwordRequired'),
});

export type LoginFormValues = z.infer<typeof loginSchema>;

export interface LoginFormProps {
  onSuccess?: (values: LoginFormValues) => void;
  onError?: (error: unknown) => void;
} 