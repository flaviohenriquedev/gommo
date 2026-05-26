"use client";

import clsx from "clsx";
import {motion} from "framer-motion";
import type {ReactNode} from "react";

type PageTransitionProps = {
    children: ReactNode;
    /** Preenche a altura disponível (páginas de cadastro com CrudScreen). */
    fillHeight?: boolean;
};

export function PageTransition({children, fillHeight = false}: PageTransitionProps) {
    return (
        <motion.div
            initial={{opacity: 0, y: 8}}
            animate={{opacity: 1, y: 0}}
            transition={{duration: 0.32, ease: [0.22, 1, 0.36, 1]}}
            className={clsx(
                fillHeight ? "flex min-h-0 flex-1 flex-col" : "grid gap-3",
            )}
        >
            {children}
        </motion.div>
    );
}
