"use client";

import {AnimatePresence, motion} from "framer-motion";
import Link from "next/link";
import {usePathname} from "next/navigation";
import clsx from "clsx";
import type {AppRoute} from "@/config/routes";

type SidebarFlyoutProps = {
    route: AppRoute;
    anchorTop: number;
    onClose: () => void;
};

export function SidebarFlyout({route, anchorTop, onClose}: SidebarFlyoutProps) {
    const pathname = usePathname();

    return (
        <AnimatePresence>
            <motion.div
                initial={{opacity: 0, x: -6}}
                animate={{opacity: 1, x: 0}}
                exit={{opacity: 0, x: -6}}
                transition={{duration: 0.18, ease: [0.22, 1, 0.36, 1]}}
                className="surface-card fixed z-50 ml-[calc(var(--sidebar-collapsed)+0.5rem)] min-w-[11rem] p-2 shadow-lg"
                style={{top: anchorTop}}
                onMouseLeave={onClose}
            >
                <p className="px-3 py-2 text-[10px] font-bold uppercase tracking-[0.12em] text-base-content/40">
                    {route.label}
                </p>
                <ul className="space-y-1">
                    {route.children?.map((child) => (
                        <li key={child.id}>
                            <Link
                                href={child.href ?? "#"}
                                onClick={onClose}
                                className={clsx(
                                    "nav-item nav-item-child",
                                    pathname === child.href && "nav-item-active",
                                )}
                            >
                                {child.label}
                            </Link>
                        </li>
                    ))}
                </ul>
            </motion.div>
        </AnimatePresence>
    );
}
