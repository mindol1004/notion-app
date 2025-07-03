"use client";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Mail, Lock, User as UserIcon } from "lucide-react";
import { RegisterFormProps } from "@/features/register/types/register-type";
import { useRegisterLogic } from "@/features/register/hooks/use-register";

export function RegisterForm(props: RegisterFormProps) {
  const { t } = useTranslation();
  const { values, handleChange, handleSubmit, loading, error } = useRegisterLogic(props);

  return (
    <motion.form
      className="flex flex-col gap-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      onSubmit={handleSubmit}
    >
      <div className="relative">
        <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input
          name="name"
          type="text"
          placeholder={t('auth.name')}
          className="pl-10 pr-3 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-400 outline-none bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white w-full"
          value={values.name || ""}
          onChange={handleChange}
          autoComplete="name"
        />
      </div>
      <div className="relative">
        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input
          name="email"
          type="email"
          placeholder={t('auth.email')}
          className="pl-10 pr-3 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-400 outline-none bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white w-full"
          value={values.email}
          onChange={handleChange}
          autoComplete="email"
        />
      </div>
      <div className="relative">
        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input
          name="password"
          type="password"
          placeholder={t('auth.password')}
          className="pl-10 pr-3 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-400 outline-none bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white w-full"
          value={values.password}
          onChange={handleChange}
          autoComplete="new-password"
        />
      </div>
      {error && <motion.div className="text-red-500 text-sm text-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>{t(error)}</motion.div>}
      <motion.button
        type="submit"
        className="w-full py-3 rounded-lg bg-black/90 hover:bg-black text-white font-semibold shadow transition-all duration-200 mt-2 flex items-center justify-center gap-2"
        whileTap={{ scale: 0.97 }}
        disabled={loading}
      >
        {loading ? t('common.loading') : t('auth.register')}
      </motion.button>
    </motion.form>
  );
}