"use client";

import clsx from "clsx";
import {AnimatePresence, motion} from "framer-motion";
import {ChevronDown, PanelLeftClose, PanelLeftOpen, Search} from "lucide-react";
import Link from "next/link";
import {usePathname} from "next/navigation";
import {useEffect, useMemo, useState} from "react";
import {APP_ROUTES, type AppRoute, flattenRoutes} from "@/config/routes";
import {SidebarFlyout} from "@/shared/components/layout/SidebarFlyout";

type SidebarProps = {
    collapsed: boolean;
    onToggle: () => void;
};

function routeIsActive(route: AppRoute, pathname: string): boolean {
    if (route.href === pathname) return true;
    return route.children?.some((c) => c.href === pathname) ?? false;
}

export function Sidebar({collapsed, onToggle}: SidebarProps) {
    const pathname = usePathname();
    const [query, setQuery] = useState("");
    const [openIds, setOpenIds] = useState<Set<string>>(new Set());
    const [flyout, setFlyout] = useState<{ route: AppRoute; top: number } | null>(null);

    const flat = useMemo(() => flattenRoutes(APP_ROUTES), []);
    const isSearching = query.trim().length > 0;

    const filteredTop = useMemo(() => {
        if (!isSearching) return APP_ROUTES;
        const q = query.toLowerCase();
        const matches = flat.filter((r) => r.searchLabel.toLowerCase().includes(q));
        const ids = new Set(matches.map((m) => m.id));
        return APP_ROUTES.filter(
            (r) =>
                ids.has(r.id) ||
                r.children?.some((c) => ids.has(c.id)) ||
                r.label.toLowerCase().includes(q),
        );
    }, [query, flat, isSearching]);

    useEffect(() => {
        const next = new Set<string>();
        for (const route of APP_ROUTES) {
            if (route.children?.some((c) => c.href === pathname)) next.add(route.id);
        }
        setOpenIds((prev) => new Set([...prev, ...next]));
    }, [pathname]);

    useEffect(() => {
        if (!isSearching) return;
        const q = query.toLowerCase();
        const next = new Set<string>();
        for (const route of APP_ROUTES) {
            if (route.children?.some((c) => c.label.toLowerCase().includes(q) || c.href?.includes(q))) {
                next.add(route.id);
            }
        }
        setOpenIds((prev) => new Set([...prev, ...next]));
    }, [query, isSearching]);

    const toggleGroup = (id: string) => {
        setOpenIds((prev) => {
            const next = new Set(prev);
            if (next.has(id)) next.delete(id);
            else next.add(id);
            return next;
        });
    };

    const isOpen = (id: string) => isSearching || openIds.has(id);

    const NavLink = ({route, nested}: { route: AppRoute; nested?: boolean }) => {
        const Icon = route.icon;
        const active = route.href === pathname;

        return (
            <Link
                href={route.href ?? "#"}
                title={route.label}
                className={clsx(
                    "gommo-nav",
                    nested && "gommo-nav-child",
                    collapsed && !nested && "size-10 justify-center p-0",
                    active && "gommo-nav-active",
                )}
            >
                <Icon className={clsx("shrink-0 opacity-90", nested ? "size-3.5" : "size-4")} strokeWidth={2}/>
                {!collapsed && <span className="truncate">{route.label}</span>}
            </Link>
        );
    };

    const renderExpandedItem = (route: AppRoute) => {
        const Icon = route.icon;
        const hasChildren = Boolean(route.children?.length);
        const active = routeIsActive(route, pathname);
        const expanded = isOpen(route.id);

        if (!hasChildren) {
            return (
                <li key={route.id}>
                    <NavLink route={route}/>
                </li>
            );
        }

        return (
            <li key={route.id} className="grid gap-0.5">
                <button
                    type="button"
                    onClick={() => toggleGroup(route.id)}
                    aria-expanded={expanded}
                    className={clsx(
                        "gommo-nav",
                        active && !expanded && "text-base-content font-bold",
                    )}
                >
                    <Icon className="size-4 shrink-0" strokeWidth={2}/>
                    <span className="flex-1 truncate text-left">{route.label}</span>
                    <ChevronDown
                        className={clsx(
                            "size-3.5 shrink-0 opacity-40 transition-transform duration-200",
                            expanded && "rotate-180",
                        )}
                    />
                </button>

                <AnimatePresence initial={false}>
                    {expanded && (
                        <motion.ul
                            initial={{height: 0, opacity: 0}}
                            animate={{height: "auto", opacity: 1}}
                            exit={{height: 0, opacity: 0}}
                            transition={{duration: 0.24, ease: [0.22, 1, 0.36, 1]}}
                            className="overflow-hidden pl-1"
                        >
                            {route.children?.map((child) => (
                                <li key={child.id}>
                                    <NavLink route={child} nested/>
                                </li>
                            ))}
                        </motion.ul>
                    )}
                </AnimatePresence>
            </li>
        );
    };

    const renderCollapsedItem = (route: AppRoute) => {
        const Icon = route.icon;
        const hasChildren = Boolean(route.children?.length);
        const active = routeIsActive(route, pathname);

        if (hasChildren) {
            return (
                <li key={route.id}>
                    <button
                        type="button"
                        aria-label={route.label}
                        onClick={(e) => setFlyout({route, top: e.currentTarget.getBoundingClientRect().top})}
                        className={clsx("gommo-nav size-10 justify-center p-0", active && "gommo-nav-active")}
                    >
                        <Icon className="size-4" strokeWidth={2}/>
                    </button>
                </li>
            );
        }

        return (
            <li key={route.id}>
                <NavLink route={route}/>
            </li>
        );
    };

    return (
        <motion.aside
            layout
            transition={{type: "spring", stiffness: 380, damping: 32}}
            className={clsx(
                "gommo-sidebar relative z-20 flex h-full shrink-0 flex-col",
                collapsed ? "w-[4.25rem]" : "w-[16.25rem]",
            )}
        >
            <div
                className={clsx(
                    "flex shrink-0 items-center gap-2 px-2 py-3",
                    collapsed ? "flex-col" : "px-3",
                )}
            >
                <button
                    type="button"
                    onClick={onToggle}
                    aria-label={collapsed ? "Expandir menu" : "Recolher menu"}
                    className="btn btn-ghost btn-sm btn-square size-9 min-h-9 rounded-box text-base-content/50 hover:bg-base-200 hover:text-base-content"
                >
                    {collapsed ? (
                        <PanelLeftOpen className="size-4" strokeWidth={2}/>
                    ) : (
                        <PanelLeftClose className="size-4" strokeWidth={2}/>
                    )}
                </button>

                {!collapsed && (
                    <Link href="/dashboard" className="flex min-w-0 flex-1 items-center gap-2.5">
            <span
                className="flex size-9 shrink-0 items-center justify-center rounded-box bg-primary text-xs font-bold text-primary-content shadow-sm">
              G
            </span>
                        <span className="truncate text-sm font-bold tracking-tight">Gommo</span>
                    </Link>
                )}

                {collapsed && (
                    <Link
                        href="/dashboard"
                        title="Gommo"
                        className="flex size-9 items-center justify-center rounded-box bg-primary text-xs font-bold text-primary-content shadow-sm"
                    >
                        G
                    </Link>
                )}
            </div>

            <AnimatePresence>
                {!collapsed && (
                    <motion.div
                        initial={{opacity: 0, height: 0}}
                        animate={{opacity: 1, height: "auto"}}
                        exit={{opacity: 0, height: 0}}
                        className="overflow-hidden px-3 pb-2"
                    >
                        <label className="gommo-input flex items-center gap-2 px-3">
                            <Search className="size-3.5 shrink-0 opacity-40"/>
                            <input
                                type="search"
                                placeholder="Buscar menu..."
                                className="w-full bg-transparent text-[11px] font-medium placeholder:opacity-40"
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                            />
                        </label>
                    </motion.div>
                )}
            </AnimatePresence>

            <nav className="flex-1 overflow-y-auto overflow-x-hidden px-2 pb-4">
                <ul className={clsx("grid gap-1", collapsed && "justify-items-center")}>
                    {filteredTop.map((route) =>
                        collapsed ? renderCollapsedItem(route) : renderExpandedItem(route),
                    )}
                </ul>
            </nav>

            {collapsed && flyout && (
                <SidebarFlyout route={flyout.route} anchorTop={flyout.top} onClose={() => setFlyout(null)}/>
            )}
        </motion.aside>
    );
}
