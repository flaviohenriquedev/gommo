"use client";

import clsx from "clsx";
import type {ButtonHTMLAttributes, ReactNode} from "react";

type ButtonVariant = "primary" | "secondary" | "ghost" | "outline" | "danger" | "neutral";
type ButtonSize = "sm" | "md" | "lg";

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: ButtonVariant;
    size?: ButtonSize;
    loading?: boolean;
    leftIcon?: ReactNode;
    rightIcon?: ReactNode;
};

const variantClass: Record<ButtonVariant, string> = {
    primary: "btn-primary",
    secondary: "btn-secondary",
    neutral: "btn-neutral",
    ghost: "btn-ghost bg-transparent hover:bg-base-200",
    outline: "btn-outline border-base-300 bg-base-100 hover:border-primary/40",
    danger: "btn-error",
};

const sizeClass: Record<ButtonSize, string> = {
    sm: "btn-sm min-h-8 h-8 px-3 text-xs",
    md: "btn-md min-h-10 h-10 px-4 text-sm",
    lg: "btn-lg min-h-12 h-12 px-6 text-sm",
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
                "btn rounded-field border-0 font-semibold tracking-tight shadow-sm",
                "transition-all duration-200 active:scale-[0.98] disabled:active:scale-100",
                variantClass[variant],
                sizeClass[size],
                className,
            )}
            disabled={disabled || loading}
            {...props}
        >
            {loading && <span className="loading loading-spinner loading-xs"/>}
            {!loading && leftIcon}
            {children}
            {!loading && rightIcon}
        </button>
    );
}
