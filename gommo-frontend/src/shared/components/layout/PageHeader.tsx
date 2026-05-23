"use client";

import {motion} from "framer-motion";
import type {ReactNode} from "react";

type PageHeaderProps = {
    title: string;
    description?: string;
    actions?: ReactNode;
};

export function PageHeader({title, description, actions}: PageHeaderProps) {
    return (
        <motion.header
            initial={{opacity: 0, y: 10}}
            animate={{opacity: 1, y: 0}}
            transition={{duration: 0.4, ease: [0.22, 1, 0.36, 1]}}
            className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between"
        >
            <div>
                <h1 className="text-2xl font-bold tracking-tight md:text-[1.75rem]">{title}</h1>
                {description && (
                    <p className="mt-1 max-w-xl text-xs text-base-content/50 md:text-sm">{description}</p>
                )}
            </div>
            {actions && <div className="flex shrink-0 flex-wrap items-center gap-2">{actions}</div>}
        </motion.header>
    );
}
