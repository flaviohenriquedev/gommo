"use client";

import {QueryClientProvider} from "@tanstack/react-query";
import {SessionProvider} from "next-auth/react";
import {type ReactNode, useState} from "react";
import {Toaster} from "sonner";
import {createQueryClient} from "@/shared/lib/query-client";
import {ThemeProvider} from "@/shared/components/providers/ThemeProvider";

export function AppProviders({children}: { children: ReactNode }) {
    const [queryClient] = useState(() => createQueryClient());

    return (
        <SessionProvider>
            <QueryClientProvider client={queryClient}>
                <ThemeProvider>
                    {children}
                    <Toaster richColors position="top-right" closeButton/>
                </ThemeProvider>
            </QueryClientProvider>
        </SessionProvider>
    );
}
