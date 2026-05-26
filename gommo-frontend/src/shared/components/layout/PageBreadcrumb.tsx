"use client";

import clsx from "clsx";
import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { getBreadcrumbs } from "@/config/breadcrumbs";

type PageBreadcrumbProps = {
    actions?: ReactNode;
    /** Sobrescreve o rótulo do item ativo (ex.: "Editar colaborador") */
    activeLabel?: string;
};

export function PageBreadcrumb({ actions, activeLabel }: PageBreadcrumbProps) {
    const pathname = usePathname();
    const items = getBreadcrumbs(pathname).map((item, index, all) =>
        index === all.length - 1 && activeLabel ? { ...item, label: activeLabel } : item,
    );

    return (
        <motion.header
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="page-breadcrumb flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between"
        >
            <nav aria-label="Breadcrumb" className="min-w-0 animate-fade-up">
                <div className="breadcrumbs min-w-0 p-0 text-sm">
                    <ul className="min-w-0 flex-wrap gap-y-1">
                        {items.map((item, index) => {
                            const Icon = item.icon;
                            const content = (
                                <span className="inline-flex min-w-0 max-w-[14rem] items-center gap-1.5 sm:max-w-none">
                                    {Icon && (
                                        <Icon
                                            className={clsx(
                                                "size-3.5 shrink-0",
                                                item.isActive
                                                    ? "text-digital-blue-600 dark:text-primary"
                                                    : "text-base-content/45",
                                            )}
                                            strokeWidth={item.isActive ? 2.25 : 2}
                                            aria-hidden
                                        />
                                    )}
                                    <span className="truncate">{item.label}</span>
                                </span>
                            );

                            return (
                                <li
                                    key={`${index}-${item.label}`}
                                    className={clsx(
                                        item.isActive &&
                                            "font-semibold text-digital-blue-700 dark:text-primary [&>a]:text-inherit",
                                    )}
                                    aria-current={item.isActive ? "page" : undefined}
                                >
                                    {item.isActive || !item.href ? (
                                        <span
                                            className={clsx(
                                                "inline-flex min-w-0",
                                                item.isActive && "text-digital-blue-700 dark:text-primary",
                                            )}
                                        >
                                            {content}
                                        </span>
                                    ) : (
                                        <Link
                                            href={item.href}
                                            className="link link-hover inline-flex min-w-0 text-base-content/55 no-underline hover:text-digital-blue-600 dark:hover:text-primary"
                                        >
                                            {content}
                                        </Link>
                                    )}
                                </li>
                            );
                        })}
                    </ul>
                </div>
            </nav>

            {actions && (
                <div className="flex shrink-0 flex-wrap items-center gap-2">{actions}</div>
            )}
        </motion.header>
    );
}
