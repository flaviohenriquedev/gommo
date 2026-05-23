"use client";

import {Moon, Sun} from "lucide-react";
import {useTheme} from "next-themes";
import {useEffect, useState} from "react";

export function ThemeToggle() {
    const {theme, setTheme, resolvedTheme} = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => setMounted(true), []);

    if (!mounted) {
        return <div className="size-9 rounded-box bg-base-200"/>;
    }

    const isDark = (theme === "system" ? resolvedTheme : theme) === "dark";

    return (
        <button
            type="button"
            aria-label="Alternar tema"
            onClick={() => setTheme(isDark ? "gommo" : "dark")}
            className="btn btn-ghost btn-sm btn-square size-9 min-h-9 rounded-box border border-base-300/50 bg-base-100"
        >
            {isDark ? <Sun className="size-4"/> : <Moon className="size-4"/>}
        </button>
    );
}
