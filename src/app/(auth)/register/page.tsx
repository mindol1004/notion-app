"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { Home, UserPlus, ArrowLeft } from "lucide-react";
import { RegisterForm } from "@/features/register/components/RegisterForm";
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";

export default function RegisterPage() {
  const { t } = useTranslation();
  const router = useRouter();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-white to-gray-100 dark:from-black dark:to-gray-900">
      <motion.div
        className="w-full max-w-sm bg-white dark:bg-gray-900 rounded-2xl shadow-xl p-8 flex flex-col gap-6 relative"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        <Link href="/" className="absolute left-4 top-4 text-gray-400 hover:text-blue-500 transition-colors">
          <Home className="w-6 h-6" />
        </Link>
        <motion.h2
          className="text-2xl font-bold text-center mb-2 text-gray-900 dark:text-white flex items-center justify-center gap-2"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.7 }}
        >
          <UserPlus className="w-7 h-7 text-blue-500" />
          {t('auth.register')}
        </motion.h2>
        <RegisterForm onSuccess={() => router.push("/login")} />
        <motion.div
          className="flex items-center justify-center mt-4 gap-2"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          <span className="text-sm text-gray-500">{t('auth.hasAccount')}</span>
          <Link href="/login" className="flex items-center gap-1 text-blue-500 hover:underline font-medium">
            <ArrowLeft className="w-4 h-4 rotate-180" />
            {t('auth.login')}
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
}
