import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { LoginFormProps, LoginFormValues, loginSchema } from "../types/login-type";
import { useTranslation } from "react-i18next";

// 실제 로그인 API 예시 (실제 구현시 교체)
async function fakeLoginApi(values: LoginFormValues) {
  await new Promise((r) => setTimeout(r, 700));
  return true;
}

export function useLoginLogic(props: LoginFormProps) {
  const { t } = useTranslation();
  const [values, setValues] = useState<LoginFormValues>({ email: "", password: "" });
  const [localError, setLocalError] = useState<string>("");

  const mutation = useMutation({
    mutationFn: fakeLoginApi,
    onSuccess: (_, variables) => {
      props.onSuccess?.(variables);
    },
    onError: (err) => {
      setLocalError('common.loginError');
      props.onError?.(err);
    },
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setValues((v: LoginFormValues) => ({ ...v, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLocalError("");
    const result = loginSchema.safeParse(values);
    if (!result.success) {
      const errorKey = result.error.errors[0]?.message || 'common.unknownError';
      setLocalError(errorKey);
      props.onError?.(result.error);
      return;
    }
    mutation.mutate(result.data);
  }

  return {
    values,
    handleChange,
    handleSubmit,
    loading: mutation.isPending,
    error: localError || (mutation.error ? 'common.loginError' : ""),
  };
} 