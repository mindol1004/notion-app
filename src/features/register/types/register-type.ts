import { z } from "zod";

export const registerSchema = z.object({
  email: z.string().email("common.invalidEmail"),
  password: z.string().min(6, "common.passwordTooShort"),
  name: z.string().optional(),
});

export type RegisterFormValues = z.infer<typeof registerSchema>;

export interface RegisterFormProps {
  onSuccess?: (values: RegisterFormValues) => void;
  onError?: (error: Error | z.ZodError) => void;
}