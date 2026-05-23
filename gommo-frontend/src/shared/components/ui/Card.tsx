"use client";

import clsx from "clsx";
import {motion} from "framer-motion";
import type {ReactNode} from "react";

type CardProps = {
    children: ReactNode;
    className?: string;
    bodyClassName?: string;
    delay?: number;
    title?: string;
    subtitle?: string;
    headerAction?: ReactNode;
    /** Enables a subtle lift on hover — good for interactive/clickable cards */
    hoverable?: boolean;
};

export function Card({
                         children,
                         className,
                         bodyClassName,
                         delay = 0,
                         title,
                         subtitle,
                         headerAction,
                         hoverable = false,
                     }: CardProps) {
    return (
        <motion.div
            initial={{opacity: 0, y: 8}}
            animate={{opacity: 1, y: 0}}
            transition={{duration: 0.38, delay, ease: [0.22, 1, 0.36, 1]}}
            className={clsx(
                "surface-card overflow-hidden",
                hoverable && "surface-card--hover cursor-pointer",
                className,
            )}
        >
            {(title || subtitle || headerAction) && (
                <div
                    className="flex items-center justify-between gap-4 border-b border-digital-blue-100/60 px-5 py-4 md:px-6">
                    <div className="min-w-0 flex-1">
                        {title && (
                            <h3 className="truncate text-[13px] font-bold tracking-tight text-base-content">
                                {title}
                            </h3>
                        )}
                        {subtitle && (
                            <p className="mt-0.5 text-[11px] text-base-content/45">{subtitle}</p>
                        )}
                    </div>
                    {headerAction && (
                        <div className="shrink-0">{headerAction}</div>
                    )}
                </div>
            )}
            <div className={clsx("p-5 md:p-6", bodyClassName)}>{children}</div>
        </motion.div>
    );
}
