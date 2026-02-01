"use client";
import { MessageCircle } from "lucide-react";
import { motion } from "framer-motion";
import { createPortal } from "react-dom";
import Link from "next/link";
export default function CodChatCTA() {
  if (typeof window === "undefined") return null;

  return createPortal(
    <Link href="/contact">
      <motion.div
        aria-label="Chat with us"
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ delay: 0.4, type: "spring", stiffness: 260, damping: 18 }}
        className="
          fixed bottom-6 right-6 z-[99999]
          flex items-center gap-3
          rounded-lg px-5 py-4
          bg-accent/80 border-solid-secondary text-white
          shadow-2xl
          cursor-pointer
          hover:bg-secondary/50
          hover:shadow-[0_0_10px_hsl(var(--secondary)/0.55)]
          transition-all
        "
      >
        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10">
          <MessageCircle className="h-6 w-6" />
        </div>

        <div className="hidden sm:flex flex-col leading-tight">
          <span className="text-sm font-bold">Instant Help</span>
          <span className="text-xs opacity-80">Powered by CodChat</span>
        </div>
      </motion.div>
    </Link>,
    document.body,
  );
}
