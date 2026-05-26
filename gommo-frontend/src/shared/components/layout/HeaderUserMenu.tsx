"use client";

import clsx from "clsx";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, LogOut, Settings } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import { useEffect, useRef, useState } from "react";
import { userInitials } from "@/shared/lib/user-display";

export function HeaderUserMenu() {
  const { data: session } = useSession();
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  const name = session?.user?.name ?? "Usuário";
  const initials = userInitials(name);

  useEffect(() => {
    if (!open) return;

    const onPointerDown = (e: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };

    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <div ref={rootRef} className="relative ms-0.5 sm:ms-1">
      {/* Trigger */}
      <button
        type="button"
        aria-label="Menu do usuário"
        aria-expanded={open}
        aria-haspopup="menu"
        onClick={() => setOpen((v) => !v)}
        className={clsx(
          "flex items-center gap-2 rounded-[10px] py-1 ps-1 pe-2.5 transition-colors duration-150",
          open ? "bg-digital-blue-50 dark:bg-primary/15" : "hover:bg-base-200/70 dark:hover:bg-base-300/40",
        )}
      >
        {/* Avatar */}
        <span
          className="flex size-7 items-center justify-center rounded-full text-[11px] font-bold text-white"
          style={{
            background: "linear-gradient(135deg, var(--color-digital-blue-400) 0%, var(--color-digital-blue-600) 100%)",
          }}
        >
          {initials}
        </span>
        <span className="hidden max-w-[8rem] truncate text-[13px] font-semibold text-base-content sm:inline">
          {name}
        </span>
        <ChevronDown
          className={clsx(
            "hidden size-3 text-base-content/35 transition-transform duration-200 sm:block",
            open && "rotate-180",
          )}
        />
      </button>

      {/* Dropdown */}
      <AnimatePresence>
        {open && (
          <motion.div
            role="menu"
            aria-label="Conta do usuário"
            initial={{ opacity: 0, y: -5, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -5, scale: 0.97 }}
            transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
            className="surface-popover absolute right-0 z-50 mt-2 min-w-[13rem] origin-top-right p-1.5"
          >
            {/* User info */}
            <div className="flex items-center gap-3 rounded-[10px] px-3 py-2.5">
              <span
                className="flex size-9 shrink-0 items-center justify-center rounded-full text-[12px] font-bold text-white"
                style={{
                  background: "linear-gradient(135deg, var(--color-digital-blue-400) 0%, var(--color-digital-blue-700) 100%)",
                  boxShadow: "0 2px 8px color-mix(in srgb, var(--color-digital-blue-600) 30%, transparent)",
                }}
              >
                {initials}
              </span>
              <div className="min-w-0">
                <p className="truncate text-[13px] font-semibold text-base-content">{name}</p>
                <p className="text-[11px] text-base-content/40">Administrador</p>
              </div>
            </div>

            <div className="my-1 h-px bg-digital-blue-100/70 dark:bg-base-content/10" />

            {/* Settings (placeholder) */}
            <button
              type="button"
              role="menuitem"
              className="nav-item gap-2.5 !px-3 text-left text-[13px]"
            >
              <Settings className="size-[15px] shrink-0 text-base-content/38" strokeWidth={2} />
              Configurações
            </button>

            <div className="my-1 h-px bg-digital-blue-100/70 dark:bg-base-content/10" />

            {/* Sign out */}
            <button
              type="button"
              role="menuitem"
              className="nav-item gap-2.5 !px-3 text-left text-[13px] text-error hover:bg-error/8 hover:text-error"
              onClick={() => signOut({ callbackUrl: "/login" })}
            >
              <LogOut className="size-[15px] shrink-0" strokeWidth={2} />
              Sair da conta
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
