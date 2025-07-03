"use client";

import { motion } from "framer-motion";
import { signOut, useSession } from "next-auth/react";
import { useTranslation } from "react-i18next";
import { LogOut } from "lucide-react";
import { Avatar } from "@/features/common/components/Avatar";
import { Button } from "@/components/ui/button";

export function AppHeader() {
  const { data: session } = useSession();
  const { t } = useTranslation();

  const handleSignOut = async () => {
    await signOut({ callbackUrl: "/login" }); // Redirect to login page after logout
  };

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 120, damping: 14, duration: 0.5 }}
      className="flex items-center justify-between p-4 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-sm z-10 border-b sticky top-0" // Changed from fixed and removed left-0, w-full
    >
      <motion.div
        initial={{ x: -50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.2, type: "spring", stiffness: 120, damping: 14 }}
        className="flex items-center gap-3"
      >
        {session?.user?.image ? (
          <Avatar src={session.user.image} alt={session.user.name || "User Avatar"} size="md" fallback={""} />
        ) : (
          <Avatar fallback={session?.user?.name?.charAt(0) || "U"} size="md" />
        )}
        <span className="text-lg font-semibold text-gray-900 dark:text-white">
          {session?.user?.name || t("common.guest")}
        </span>
      </motion.div>

      <motion.nav
        initial={{ x: 50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.2, type: "spring", stiffness: 120, damping: 14 }}
      >
        <Button onClick={handleSignOut} variant="ghost" className="flex items-center gap-2">
          <LogOut className="h-4 w-4" />
          {t("common.logout")}
        </Button>
      </motion.nav>
    </motion.header>
  );
}
