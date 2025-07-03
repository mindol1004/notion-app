import { useState } from "react";
import { RegisterFormProps, RegisterFormValues, registerSchema } from "../types/register-type";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/navigation";

export function useRegisterLogic(props: RegisterFormProps) {
  const { t } = useTranslation();
  const router = useRouter();
  const [values, setValues] = useState<RegisterFormValues>({ email: "", password: "", name: "" });
  const [localError, setLocalError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLocalError("");
    setLoading(true);

    const result = registerSchema.safeParse(values);
    if (!result.success) {
      const errorKey = result.error.errors[0]?.message || 'auth.unknownError';
      setLocalError(errorKey);
      setLoading(false);
      props.onError?.(result.error);
      return;
    }

    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(result.data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setLocalError(errorData.message || 'auth.registrationError');
        props.onError?.(new Error(errorData.message || 'Registration failed'));
      } else {
        props.onSuccess?.(result.data);
        router.push("/login"); // Redirect to login page after successful registration
      }
    } catch (error) {
      setLocalError('auth.registrationError');
      props.onError?.(error as Error);
    }
    setLoading(false);
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setValues((v: RegisterFormValues) => ({ ...v, [e.target.name]: e.target.value }));
  }

  return {
    values,
    handleChange,
    handleSubmit,
    loading,
    error: localError,
  };
}