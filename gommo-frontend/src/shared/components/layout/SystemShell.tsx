"use client";

import {Bell, Command, Menu, Search} from "lucide-react";
import {motion} from "framer-motion";
import {useSession} from "next-auth/react";
import {type ReactNode, useEffect, useState} from "react";
import {HeaderUserMenu} from "@/shared/components/layout/HeaderUserMenu";
import {Sidebar} from "@/shared/components/layout/Sidebar";
import {SidebarEdgeToggle} from "@/shared/components/layout/SidebarEdgeToggle";
import {ThemeToggle} from "@/shared/components/layout/ThemeToggle";
import {setAuthToken} from "@/shared/lib/api.client";

export function SystemShell({children}: { children: ReactNode }) {
    const [collapsed, setCollapsed] = useState(false);
    const [mobileNav, setMobileNav] = useState(false);
    const {data: session} = useSession();

    useEffect(() => {
        setAuthToken(session?.accessToken ?? null);
    }, [session?.accessToken]);

    useEffect(() => {
        document.documentElement.style.setProperty(
            "--sidebar-current",
            collapsed ? "var(--sidebar-collapsed)" : "var(--sidebar-width)",
        );
    }, [collapsed]);

    useEffect(() => {
        document.documentElement.classList.add("gommo-workspace-active");
        return () => document.documentElement.classList.remove("gommo-workspace-active");
    }, []);

    return (
        <div className="flex h-dvh flex-col overflow-hidden">
            <Sidebar
                collapsed={collapsed}
                mobileOpen={mobileNav}
                onMobileCloseAction={() => setMobileNav(false)}
            />

            <div
                className="flex h-dvh min-h-0 flex-1 flex-col overflow-hidden transition-[margin] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] lg:ms-(--sidebar-current,var(--sidebar-width))">
                <header
                    className="surface-header sticky top-0 z-30 flex h-(--header-height) shrink-0 items-center justify-between gap-3 px-4 sm:gap-4 sm:px-6">

                    {/* Mobile nav toggle */}
                    <button
                        type="button"
                        aria-label="Abrir menu"
                        onClick={() => setMobileNav(true)}
                        className="gommo-btn gommo-btn--ghost gommo-btn--icon-only shrink-0 text-base-content/50 lg:hidden!"
                    >
                        <Menu className="size-4.5" strokeWidth={2}/>
                    </button>

                    {/* Search bar */}
                    <label className="gommo-field relative min-w-0 flex-1 cursor-text sm:max-w-xs lg:max-w-sm">
                        <Search className="size-4 shrink-0 text-digital-blue-400" strokeWidth={2}/>
                        <input
                            type="search"
                            placeholder="Buscar no sistema…"
                            className="pe-2 placeholder:text-base-content/35"
                        />
                        <kbd className="ms-auto hidden shrink-0 sm:flex">
                            <Command className="size-2.5" strokeWidth={2.5}/>K
                        </kbd>
                    </label>

                    {/* Right controls */}
                    <div className="flex items-center gap-1 sm:gap-1.5">
                        <div className="mx-1 hidden h-5 w-px bg-digital-blue-200/60 dark:bg-base-content/12 sm:block"/>

                        <ThemeToggle/>

                        {/* Notifications */}
                        <button
                            type="button"
                            aria-label="Notificações"
                            className="gommo-btn gommo-btn--ghost gommo-btn--icon-only relative text-base-content/50"
                        >
                            <Bell className="size-4.25" strokeWidth={2}/>
                            <span
                                className="absolute right-2 top-2 size-1.75 rounded-full bg-error ring-2 ring-base-100"/>
                        </button>

                        <HeaderUserMenu/>
                    </div>
                </header>

                <motion.main
                    id="main-content"
                    initial={{opacity: 0, y: 4}}
                    animate={{opacity: 1, y: 0}}
                    transition={{duration: 0.35, ease: [0.22, 1, 0.36, 1]}}
                    className="relative flex min-h-0 flex-1 flex-col overflow-hidden"
                >
                    <SidebarEdgeToggle
                        collapsed={collapsed}
                        onToggle={() => setCollapsed((v) => !v)}
                    />
                    {children}
                </motion.main>
            </div>
        </div>
    );
}
