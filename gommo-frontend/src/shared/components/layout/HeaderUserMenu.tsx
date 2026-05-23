"use client";

import clsx from "clsx";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, LogOut } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import { useEffect, useRef, useState } from "react";
import { userInitials } from "@/shared/lib/user-display";

export function HeaderUserMenu() {
  const { data: session } = useSession();
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  const name = session?.user?.name ?? "Usuário";

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
      <button
        type="button"
        aria-label="Menu do usuário"
        aria-expanded={open}
        aria-haspopup="menu"
        onClick={() => setOpen((v) => !v)}
        className={clsx(
          "flex items-center gap-1.5 rounded-full py-1 ps-1 pe-2 transition-colors",
          open ? "bg-base-200" : "hover:bg-base-200/80",
        )}
      >
        <span className="flex size-8 items-center justify-center rounded-full bg-primary/12 text-xs font-bold text-primary">
          {userInitials(name)}
        </span>
        <span className="hidden max-w-[7rem] truncate text-xs font-semibold text-base-content sm:inline">
          {name}
        </span>
        <ChevronDown
          className={clsx(
            "hidden size-3.5 text-base-content/40 transition-transform sm:block",
            open && "rotate-180",
          )}
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            role="menu"
            aria-label="Conta do usuário"
            initial={{ opacity: 0, y: -4, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -4, scale: 0.98 }}
            transition={{ duration: 0.16, ease: [0.22, 1, 0.36, 1] }}
            className="surface-card absolute right-0 z-50 mt-2 min-w-[12.5rem] origin-top-right p-1.5 shadow-lg"
          >
            <div className="flex items-center gap-2.5 rounded-lg px-2.5 py-2">
              <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-primary/90 to-primary text-xs font-bold text-primary-content">
                {userInitials(name)}
              </span>
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-base-content">{name}</p>
                <p className="text-[11px] text-base-content/45">Administrador</p>
              </div>
            </div>

            <div className="my-1 h-px bg-base-300/60" />

            <button
              type="button"
              role="menuitem"
              className="nav-item w-full gap-2 !px-2.5 text-left text-error hover:bg-error/8 hover:text-error"
              onClick={() => signOut({ callbackUrl: "/login" })}
            >
              <LogOut className="size-4 shrink-0" />
              Sair
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
