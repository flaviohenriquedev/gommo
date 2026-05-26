import clsx from "clsx";

type GommoLogoProps = {
    /** Logo completo (sidebar expandido) ou apenas ícone (sidebar recolhido). */
    variant?: "full" | "icon";
    className?: string;
    iconClassName?: string;
    /**
     * Sobre fundo brand (ex.: hero roxo do login).
     * Usa o PNG full com tratamento claro — mesma arte do sidebar.
     */
    onBrand?: boolean;
};

/**
 * Logotipo Gommo — mesma alternância claro/escuro do sidebar
 * (`sidebar-logo-light` / `sidebar-logo-dark`).
 */
export function GommoLogo({
    variant = "full",
    className,
    iconClassName,
    onBrand = false,
}: GommoLogoProps) {
    if (variant === "icon") {
        return (
            <img
                src="/brand/gommo-logo-icon.png"
                alt="Gommo"
                width={32}
                height={32}
                className={clsx("h-8 w-8 shrink-0 rounded-lg object-contain", iconClassName, className)}
            />
        );
    }

    if (onBrand) {
        return (
            <img
                src="/brand/gommo-logo-full.png"
                alt="Gommo"
                width={180}
                height={48}
                className={clsx(
                    "gommo-logo-on-brand h-9 w-auto max-w-[180px] shrink-0 object-contain object-left",
                    className,
                )}
            />
        );
    }

    return (
        <>
            <img
                src="/brand/gommo-logo-full.png"
                alt="Gommo"
                width={160}
                height={44}
                className={clsx(
                    "sidebar-logo-light h-9 w-auto max-w-[160px] shrink-0 object-contain object-left",
                    className,
                )}
            />
            <img
                src="/brand/gommo-logo-white.png"
                alt="Gommo"
                width={160}
                height={44}
                className={clsx(
                    "sidebar-logo-dark h-9 w-auto max-w-[160px] shrink-0 object-contain object-left",
                    className,
                )}
            />
        </>
    );
}
