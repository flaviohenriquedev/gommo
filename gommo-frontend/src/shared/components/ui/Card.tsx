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
};

export function Card({children, className, bodyClassName, delay = 0, title, subtitle}: CardProps) {
    return (
        <motion.div
            initial={{opacity: 0, y: 14}}
            animate={{opacity: 1, y: 0}}
            transition={{duration: 0.4, delay, ease: [0.22, 1, 0.36, 1]}}
            className={clsx("gommo-card overflow-hidden", className)}
        >
            <div className={clsx("p-5 md:p-6", bodyClassName)}>
                {(title || subtitle) && (
                    <div className="mb-4">
                        {title && <h3 className="text-sm font-bold tracking-tight">{title}</h3>}
                        {subtitle && <p className="mt-0.5 text-xs text-base-content/50">{subtitle}</p>}
                    </div>
                )}
                {children}
            </div>
        </motion.div>
    );
}
