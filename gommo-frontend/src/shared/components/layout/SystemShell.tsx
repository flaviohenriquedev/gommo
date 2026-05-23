"use client";

import {LogOut, Search} from "lucide-react";
import {motion} from "framer-motion";
import {signOut, useSession} from "next-auth/react";
import {type ReactNode, useEffect, useState} from "react";
import {Sidebar} from "@/shared/components/layout/Sidebar";
import {ThemeToggle} from "@/shared/components/layout/ThemeToggle";
import {Button} from "@/shared/components/ui/Button";
import {setAuthToken} from "@/shared/lib/api.client";

export function SystemShell({children}: { children: ReactNode }) {
    const [collapsed, setCollapsed] = useState(false);
    const {data: session} = useSession();

    useEffect(() => {
        setAuthToken(session?.accessToken ?? null);
    }, [session?.accessToken]);

    return (
        <div className="flex h-screen overflow-hidden bg-base-200">
            <Sidebar collapsed={collapsed} onToggle={() => setCollapsed((v) => !v)}/>

            <div className="flex min-w-0 flex-1 flex-col">
                <motion.header
                    initial={{opacity: 0, y: -8}}
                    animate={{opacity: 1, y: 0}}
                    transition={{duration: 0.35, ease: [0.22, 1, 0.36, 1]}}
                    className="gommo-topbar z-10 flex h-[3.75rem] shrink-0 items-center gap-4 px-4 md:px-6"
                >
                    <label className="gommo-input hidden max-w-md flex-1 items-center gap-2 px-4 md:flex">
                        <Search className="size-4 shrink-0 opacity-35"/>
                        <input
                            type="search"
                            placeholder="Buscar no sistema..."
                            className="w-full bg-transparent text-xs font-medium placeholder:opacity-40"
                        />
                        <kbd
                            className="kbd kbd-xs hidden rounded-field border-base-300/80 bg-base-100 font-sans opacity-50 lg:inline-flex">
                            ⌘K
                        </kbd>
                    </label>

                    <div className="ml-auto flex items-center gap-2">
                        <div className="hidden text-right sm:block">
                            <p className="text-[10px] font-semibold uppercase tracking-wider text-base-content/40">Conta</p>
                            <p className="text-xs font-bold tracking-tight">{session?.user?.name ?? "Usuário"}</p>
                        </div>
                        <ThemeToggle/>
                        <Button
                            variant="primary"
                            size="sm"
                            leftIcon={<LogOut className="size-3.5"/>}
                            onClick={() => signOut({callbackUrl: "/login"})}
                        >
                            Sair
                        </Button>
                    </div>
                </motion.header>

                <main className="flex-1 overflow-auto">
                    <div className="mx-auto w-full max-w-[90rem] px-4 py-6 md:px-6 md:py-8">{children}</div>
                </main>
            </div>
        </div>
    );
}
