"use client";

import clsx from "clsx";
import { motion } from "framer-motion";
import type { ReactNode } from "react";

type CardProps = {
  children: ReactNode;
  className?: string;
  bodyClassName?: string;
  delay?: number;
  title?: string;
  subtitle?: string;
  headerAction?: ReactNode;
};

export function Card({
  children,
  className,
  bodyClassName,
  delay = 0,
  title,
  subtitle,
  headerAction,
}: CardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay, ease: [0.22, 1, 0.36, 1] }}
      className={clsx("surface-card overflow-hidden", className)}
    >
      {(title || subtitle || headerAction) && (
        <div className="flex items-start justify-between gap-4 border-b border-base-300/50 px-5 py-4 md:px-6">
          <div>
            {title && <h3 className="text-sm font-bold tracking-tight">{title}</h3>}
            {subtitle && <p className="mt-0.5 text-xs text-base-content/50">{subtitle}</p>}
          </div>
          {headerAction}
        </div>
      )}
      <div className={clsx("p-5 md:p-6", bodyClassName)}>{children}</div>
    </motion.div>
  );
}
