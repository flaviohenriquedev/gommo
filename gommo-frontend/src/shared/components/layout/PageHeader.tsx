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
            className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between bg-base-100 surface-page-header p-4"
        >
            <div className="animate-fade-up">
                {badge && (
                    <span
                        className="mb-2 inline-flex rounded-gommo-control bg-digital-blue-50 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-digital-blue-700">
            {badge}
          </span>
                )}
                <h1 className="text-xl font-bold tracking-tight text-base-content">{title}</h1>
                {description && (
                    <p className="mt-0.5 max-w-2xl text-[13px] text-base-content/55">{description}</p>
                )}
            </div>
            {actions && <div className="flex shrink-0 flex-wrap items-center gap-2">{actions}</div>}
        </motion.header>
    );
}
