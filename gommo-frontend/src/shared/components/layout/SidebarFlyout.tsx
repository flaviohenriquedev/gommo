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
                initial={{opacity: 0, x: -8, scale: 0.96}}
                animate={{opacity: 1, x: 0, scale: 1}}
                exit={{opacity: 0, x: -8, scale: 0.96}}
                transition={{type: "spring", stiffness: 420, damping: 30}}
                className="gommo-card fixed z-50 ml-[4.5rem] min-w-[12rem] p-2"
                style={{top: anchorTop}}
                onMouseLeave={onClose}
            >
                <p className="px-3 py-2 text-[10px] font-bold uppercase tracking-wider text-base-content/40">
                    {route.label}
                </p>
                <ul className="grid gap-1">
                    {route.children?.map((child) => (
                        <li key={child.id}>
                            <Link
                                href={child.href ?? "#"}
                                onClick={onClose}
                                className={clsx(
                                    "gommo-nav gommo-nav-child",
                                    pathname === child.href && "gommo-nav-active",
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
