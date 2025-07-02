"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import Link from "next/link";
import { Home, Mail, Lock, UserPlus, ArrowLeft } from "lucide-react";

export default function RegisterPage() {
  const { t } = useTranslation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email || !password) {
      setError(t('common.fillAllFields'));
      return;
    }
    setError("");
    alert(t('common.registerSuccess'));
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-white to-gray-100 dark:from-black dark:to-gray-900">
      <motion.form
        className="w-full max-w-sm bg-white dark:bg-gray-900 rounded-2xl shadow-xl p-8 flex flex-col gap-6 relative"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        onSubmit={handleSubmit}
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
          {t('common.register')}
        </motion.h2>
        <motion.div
          className="flex flex-col gap-4"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.7 }}
        >
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="email"
              placeholder={t('common.email')}
              className="pl-10 pr-3 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-400 outline-none bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white w-full"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </div>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="password"
              placeholder={t('common.password')}
              className="pl-10 pr-3 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-400 outline-none bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white w-full"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </div>
        </motion.div>
        {error && <motion.div className="text-red-500 text-sm text-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>{error}</motion.div>}
        <motion.button
          type="submit"
          className="w-full py-3 rounded-lg bg-black/90 hover:bg-black text-white font-semibold shadow transition-all duration-200 mt-2 flex items-center justify-center gap-2"
          whileTap={{ scale: 0.97 }}
        >
          <UserPlus className="w-5 h-5" />
          {t('common.register')}
        </motion.button>
        <motion.div
          className="flex items-center justify-center mt-4 gap-2"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          <span className="text-sm text-gray-500">{t('common.hasAccount')}</span>
          <Link href="/login" className="flex items-center gap-1 text-blue-500 hover:underline font-medium">
            <ArrowLeft className="w-4 h-4" />
            {t('common.login')}
          </Link>
        </motion.div>
      </motion.form>
    </div>
  );
} 