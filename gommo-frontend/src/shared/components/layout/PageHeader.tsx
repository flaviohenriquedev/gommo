"use client";

import {motion} from "framer-motion";
import type {ReactNode} from "react";

type PageHeaderProps = {
    title: string;
    description?: string;
    actions?: ReactNode;
    badge?: string;
};

export function PageHeader({title, description, actions, badge}: PageHeaderProps) {
    return (
        <motion.header
            initial={{opacity: 0, y: 8}}
            animate={{opacity: 1, y: 0}}
            transition={{duration: 0.4, ease: [0.22, 1, 0.36, 1]}}
            className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between"
        >
            <div className="animate-fade-up">
                {badge && (
                    <span
                        className="mb-2 inline-flex rounded-md bg-primary/12 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-primary">
            {badge}
          </span>
                )}
                <h1 className="text-2xl font-bold tracking-tight text-base-content">{title}</h1>
                {description && (
                    <p className="mt-1 max-w-2xl text-sm text-base-content/55">{description}</p>
                )}
            </div>
            {actions && <div className="flex shrink-0 flex-wrap items-center gap-2">{actions}</div>}
        </motion.header>
    );
}
