"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useSession } from "next-auth/react";
import { LayoutDashboard } from "lucide-react"; // Import the icon

export default function LandingPage() {
  const { t, i18n } = useTranslation();
  const { status } = useSession(); // Get session status

  // Show loading state if session is still loading
  if (status === "loading") {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-muted-foreground">Loading...</div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-white to-gray-100 dark:from-black dark:to-gray-900">
      <motion.div
        className="relative z-10 flex flex-col items-center text-center px-4 py-24"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <motion.h1
          className="text-5xl md:text-7xl font-bold tracking-tight text-gray-900 dark:text-white mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          {t('welcome.title')}
        </motion.h1>
        <motion.p
          className="mt-2 text-lg md:text-2xl text-gray-500 dark:text-gray-300 mb-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          {t('welcome.desc')}
        </motion.p>
        <motion.p
          className="text-base text-blue-500 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          {t('welcome.slogan')}
        </motion.p>
        {status === "unauthenticated" && ( // Only render login/register buttons if user is unauthenticated
          <motion.div
            className="flex gap-3 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
          >
            <Link href="/login">
              <button className="px-5 py-2 rounded-xl bg-black/90 hover:bg-black text-white font-medium shadow-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400">
                {t('welcome.login')}
              </button>
            </Link>
            <Link href="/register">
              <button className="px-5 py-2 rounded-xl bg-white/80 hover:bg-white text-black font-medium border border-gray-300 shadow-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400">
                {t('welcome.register')}
              </button>
            </Link>
          </motion.div>
        )}
        {status === "authenticated" && ( // Render 'Go to Workspace' button if user is authenticated
          <motion.div
            className="flex gap-3 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
          >
            <Link href="/workspace">
              <button className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-medium shadow-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400 flex items-center justify-center gap-2">
                <LayoutDashboard className="h-5 w-5" /> {t('welcome.goToWorkspace')}
              </button>
            </Link>
          </motion.div>
        )}
        <motion.div
          className="flex gap-2 justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
        >
          <button
            onClick={() => i18n.changeLanguage("ko")}
            className={`px-2 py-1 rounded text-xs font-medium border ${i18n.language === "ko" ? "bg-black text-white" : "bg-white/80 text-black"}`}
          >
            한국어
          </button>
          <button
            onClick={() => i18n.changeLanguage("en")}
            className={`px-2 py-1 rounded text-xs font-medium border ${i18n.language === "en" ? "bg-black text-white" : "bg-white/80 text-black"}`}
          >
            English
          </button>
        </motion.div>
      </motion.div>
    </div>
  );
}
