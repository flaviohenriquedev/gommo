"use client";

import clsx from "clsx";
import type { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonVariant = "primary" | "secondary" | "ghost" | "outline" | "danger";
type ButtonSize = "sm" | "md" | "lg";

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
};

const variantClass: Record<ButtonVariant, string> = {
  primary: "btn-primary shadow-sm hover:brightness-[1.02] active:brightness-[0.98]",
  secondary: "btn-secondary",
  ghost: "btn-ghost bg-transparent hover:bg-base-200/80",
  outline: "btn-outline border-base-300/80 bg-base-100 hover:border-primary/40",
  danger: "btn-error",
};

const sizeClass: Record<ButtonSize, string> = {
  sm: "btn-sm h-8 min-h-8 gap-1.5 px-3 text-xs font-semibold",
  md: "btn-md h-9 min-h-9 gap-2 px-4 text-sm font-semibold",
  lg: "btn-lg h-10 min-h-10 gap-2 px-5 text-sm font-semibold",
};

export function Button({
  variant = "primary",
  size = "md",
  loading = false,
  leftIcon,
  rightIcon,
  className,
  children,
  disabled,
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={clsx(
        "btn rounded-lg border-0 tracking-tight transition-all duration-200",
        "active:scale-[0.98] disabled:active:scale-100",
        variantClass[variant],
        sizeClass[size],
        className,
      )}
      disabled={disabled || loading}
      {...props}
    >
      {loading && <span className="loading loading-spinner loading-xs" />}
      {!loading && leftIcon}
      {children}
      {!loading && rightIcon}
    </button>
  );
}
