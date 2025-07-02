"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { Home, Lock, Github, Mail, Smile, ArrowLeft } from "lucide-react";
import { LoginForm } from "@/features/login/components/LoginForm";
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";

const OAUTH_PROVIDERS = [
  { name: "Google", color: "bg-white text-gray-900 border border-gray-300", icon: <Mail className="w-5 h-5" /> },
  { name: "GitHub", color: "bg-gray-900 text-white", icon: <Github className="w-5 h-5" /> },
  { name: "Kakao", color: "bg-yellow-300 text-black", icon: <Smile className="w-5 h-5" /> },
];

export default function LoginPage() {
  const { t } = useTranslation();
  const router = useRouter();

  function handleOAuth(provider: string) {
    alert(`${provider} 로그인은 추후 지원됩니다.`);
  }

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
          <Lock className="w-7 h-7 text-blue-500" />
          {t('common.login')}
        </motion.h2>
        <LoginForm onSuccess={() => router.push("/workspace")} />
        <div className="flex items-center gap-2 my-2">
          <div className="flex-1 h-px bg-gray-200 dark:bg-gray-700" />
          <span className="text-xs text-gray-400">OR</span>
          <div className="flex-1 h-px bg-gray-200 dark:bg-gray-700" />
        </div>
        <motion.div
          className="flex flex-col gap-2"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4, duration: 0.7 }}
        >
          {OAUTH_PROVIDERS.map((provider) => (
            <button
              key={provider.name}
              type="button"
              onClick={() => handleOAuth(provider.name)}
              className={`w-full py-3 rounded-lg font-semibold shadow flex items-center justify-center gap-2 mb-1 ${provider.color} transition-all duration-200 hover:scale-105`}
            >
              {provider.icon}
              <span>{provider.name}</span>
            </button>
          ))}
        </motion.div>
        <motion.div
          className="flex items-center justify-center mt-4 gap-2"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          <span className="text-sm text-gray-500">{t('common.noAccount')}</span>
          <Link href="/register" className="flex items-center gap-1 text-blue-500 hover:underline font-medium">
            <ArrowLeft className="w-4 h-4 rotate-180" />
            {t('common.register')}
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
}
