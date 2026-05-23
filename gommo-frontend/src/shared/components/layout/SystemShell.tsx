"use client";

import { Bell, Menu, Plus, Search } from "lucide-react";
import { motion } from "framer-motion";
import { useSession } from "next-auth/react";
import { useEffect, useState, type ReactNode } from "react";
import { HeaderUserMenu } from "@/shared/components/layout/HeaderUserMenu";
import { Sidebar } from "@/shared/components/layout/Sidebar";
import { ThemeToggle } from "@/shared/components/layout/ThemeToggle";
import { Button } from "@/shared/components/ui/Button";
import { setAuthToken } from "@/shared/lib/api.client";

export function SystemShell({ children }: { children: ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileNav, setMobileNav] = useState(false);
  const { data: session } = useSession();

  useEffect(() => {
    setAuthToken(session?.accessToken ?? null);
  }, [session?.accessToken]);

  useEffect(() => {
    document.documentElement.style.setProperty(
      "--sidebar-current",
      collapsed ? "var(--sidebar-collapsed)" : "var(--sidebar-width)",
    );
  }, [collapsed]);

  return (
    <div className="min-h-screen">
      <Sidebar
        collapsed={collapsed}
        onToggle={() => setCollapsed((v) => !v)}
        mobileOpen={mobileNav}
        onMobileClose={() => setMobileNav(false)}
      />

      <div
        className="flex min-h-screen flex-col transition-[margin] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] lg:ms-[var(--sidebar-current,var(--sidebar-width))]"
      >
        <header className="surface-header sticky top-0 z-30 flex h-16 shrink-0 items-center justify-between gap-3 px-4 sm:gap-4 sm:px-6">
          <button
            type="button"
            aria-label="Abrir menu"
            onClick={() => setMobileNav(true)}
            className="flex size-9 shrink-0 items-center justify-center rounded-lg text-base-content/55 transition-colors hover:bg-base-200 hover:text-base-content lg:hidden"
          >
            <Menu className="size-5" strokeWidth={2} />
          </button>

          <label className="gommo-field relative h-9 min-w-0 flex-1 sm:max-w-sm lg:max-w-md">
            <Search className="size-4 shrink-0 text-base-content/40" />
            <input type="search" placeholder="Buscar no sistema..." className="pe-14" />
            <kbd className="pointer-events-none absolute right-2.5 top-1/2 hidden -translate-y-1/2 rounded border border-base-300/80 bg-base-200/80 px-1.5 py-0.5 text-[10px] font-semibold text-base-content/45 lg:inline">
              ⌘K
            </kbd>
          </label>

          <div className="flex items-center gap-1.5 sm:gap-2">
            <Button
              variant="primary"
              size="sm"
              className="hidden sm:inline-flex"
              leftIcon={<Plus className="size-3.5" />}
            >
              Nova ação
            </Button>

            <div className="mx-1 hidden h-6 w-px bg-base-300/80 sm:block" />

            <ThemeToggle />

            <button
              type="button"
              aria-label="Notificações"
              className="relative flex size-8 items-center justify-center rounded-lg text-base-content/55 transition-colors hover:bg-base-200 hover:text-base-content"
            >
              <Bell className="size-4" strokeWidth={2} />
              <span className="absolute right-1.5 top-1.5 size-2 rounded-full bg-error" />
            </button>

            <HeaderUserMenu />
          </div>
        </header>

        <motion.main
          id="main-content"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.35 }}
          className="flex-1 p-4 sm:p-6"
        >
          {children}
        </motion.main>
      </div>
    </div>
  );
}
