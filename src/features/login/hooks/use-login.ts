import { useState } from "react";
import { LoginFormProps, LoginFormValues, loginSchema } from "../types/login-type";
import { signIn } from "next-auth/react";

export function useLoginLogic(props: LoginFormProps) {
  const [values, setValues] = useState<LoginFormValues>({ email: "", password: "" });
  const [localError, setLocalError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLocalError("");
    setLoading(true);

    const result = loginSchema.safeParse(values);
    if (!result.success) {
      const errorKey = result.error.errors[0]?.message || 'auth.unknownError';
      setLocalError(errorKey);
      setLoading(false);
      props.onError?.(result.error);
      return;
    }

    try {
      const signInResult = await signIn("credentials", {
        redirect: false,
        email: result.data.email,
        password: result.data.password,
      });

      if (signInResult?.error) {
        setLocalError('auth.loginError');
        props.onError?.(new Error(signInResult.error));
      } else {
        props.onSuccess?.(result.data);
      }
    } catch (error) {
      setLocalError('auth.loginError');
      props.onError?.(error as Error);
    }
    setLoading(false);
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setValues((v: LoginFormValues) => ({ ...v, [e.target.name]: e.target.value }));
  }

  return {
    values,
    handleChange,
    handleSubmit,
    loading,
    error: localError,
  };
}