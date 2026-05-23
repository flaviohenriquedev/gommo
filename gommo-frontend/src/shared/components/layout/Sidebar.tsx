"use client";

import clsx from "clsx";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Search } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { APP_ROUTES, NAV_SECTIONS, flattenRoutes, type AppRoute } from "@/config/routes";
import { SidebarFlyout } from "@/shared/components/layout/SidebarFlyout";

type SidebarProps = {
  collapsed: boolean;
  onToggle: () => void;
  mobileOpen?: boolean;
  onMobileClose?: () => void;
};

function routeIsActive(route: AppRoute, pathname: string): boolean {
  if (route.href === pathname) return true;
  return route.children?.some((c) => c.href === pathname) ?? false;
}

export function Sidebar({ collapsed, onToggle, mobileOpen = false, onMobileClose }: SidebarProps) {
  const pathname = usePathname();
  const [query, setQuery] = useState("");
  const [openIds, setOpenIds] = useState<Set<string>>(new Set());
  const [flyout, setFlyout] = useState<{ route: AppRoute; top: number } | null>(null);

  const flat = useMemo(() => flattenRoutes(APP_ROUTES), []);
  const isSearching = query.trim().length > 0;
  const panelCollapsed = collapsed && !mobileOpen;

  const filteredSections = useMemo(() => {
    if (!isSearching) return NAV_SECTIONS;
    const q = query.toLowerCase();
    const matches = flat.filter((r) => r.searchLabel.toLowerCase().includes(q));
    const ids = new Set(matches.map((m) => m.id));
    return NAV_SECTIONS.map((section) => ({
      ...section,
      routes: section.routes.filter(
        (r) =>
          ids.has(r.id) ||
          r.children?.some((c) => ids.has(c.id)) ||
          r.label.toLowerCase().includes(q),
      ),
    })).filter((s) => s.routes.length > 0);
  }, [query, flat, isSearching]);

  useEffect(() => {
    const next = new Set<string>();
    for (const route of APP_ROUTES) {
      if (route.children?.some((c) => c.href === pathname)) next.add(route.id);
    }
    setOpenIds((prev) => new Set([...prev, ...next]));
  }, [pathname]);

  useEffect(() => {
    onMobileClose?.();
  }, [pathname, onMobileClose]);

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

  const NavLink = ({ route, nested }: { route: AppRoute; nested?: boolean }) => {
    const Icon = route.icon;
    const active = route.href === pathname;

    return (
      <Link
        href={route.href ?? "#"}
        title={route.label}
        onClick={() => onMobileClose?.()}
        className={clsx(
          "nav-item group",
          nested && "nav-item-child",
          panelCollapsed && !nested && "size-9 justify-center gap-0 px-0",
          active && "nav-item-active",
        )}
      >
        <Icon
          className={clsx(
            "size-[18px] shrink-0 transition-colors",
            active ? "text-primary" : "text-base-content/45 group-hover:text-base-content/70",
          )}
          strokeWidth={2}
        />
        {!panelCollapsed && <span className="truncate">{route.label}</span>}
      </Link>
    );
  };

  const renderRoute = (route: AppRoute) => {
    const Icon = route.icon;
    const hasChildren = Boolean(route.children?.length);
    const active = routeIsActive(route, pathname);
    const expanded = isOpen(route.id);

    if (panelCollapsed && hasChildren) {
      return (
        <li key={route.id}>
          <button
            type="button"
            aria-label={route.label}
            onClick={(e) => setFlyout({ route, top: e.currentTarget.getBoundingClientRect().top })}
            className={clsx("nav-item size-9 justify-center gap-0 px-0", active && "nav-item-active")}
          >
            <Icon className="size-[18px]" strokeWidth={2} />
          </button>
        </li>
      );
    }

    if (panelCollapsed) {
      return (
        <li key={route.id}>
          <NavLink route={route} />
        </li>
      );
    }

    if (!hasChildren) {
      return (
        <li key={route.id}>
          <NavLink route={route} />
        </li>
      );
    }

    return (
      <li key={route.id} className="grid gap-0.5">
        <button
          type="button"
          onClick={() => toggleGroup(route.id)}
          aria-expanded={expanded}
          className={clsx("nav-item", active && !expanded && "font-semibold text-base-content")}
        >
          <Icon className="size-[18px] shrink-0 text-base-content/45" strokeWidth={2} />
          <span className="flex-1 truncate text-left">{route.label}</span>
          <ChevronRight
            className={clsx(
              "size-3.5 shrink-0 text-base-content/35 transition-transform duration-200",
              expanded && "rotate-90",
            )}
          />
        </button>
        <AnimatePresence initial={false}>
          {expanded && (
            <motion.ul
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden"
            >
              {route.children?.map((child) => (
                <li key={child.id}>
                  <NavLink route={child} nested />
                </li>
              ))}
            </motion.ul>
          )}
        </AnimatePresence>
      </li>
    );
  };

  const sidebarPanel = (opts: { desktop: boolean }) => (
    <>
      <div
        className="flex h-16 shrink-0 items-center gap-3 border-b px-4"
        style={{ borderColor: "var(--sidebar-border)" }}
      >
        <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-primary shadow-sm">
          <span className="text-xs font-bold text-primary-content">G</span>
        </div>
        {!panelCollapsed && (
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-bold tracking-tight">Gommo</p>
            <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-base-content/40">
              Departamento Pessoal
            </p>
          </div>
        )}
      </div>

      {!panelCollapsed && (
        <div className="px-3 py-3">
          <label className="gommo-field h-9 px-3">
            <Search className="size-4 shrink-0 text-base-content/40" />
            <input
              type="search"
              placeholder="Buscar no menu..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </label>
        </div>
      )}

      <nav className="flex-1 space-y-4 overflow-y-auto px-3 py-2" aria-label="Navegação principal">
        {filteredSections.map((section) => (
          <div key={section.id}>
            {!panelCollapsed && <p className="nav-section-label mb-1">{section.label}</p>}
            <ul className={clsx("space-y-0.5", panelCollapsed && "flex flex-col items-center")}>
              {section.routes.map(renderRoute)}
            </ul>
          </div>
        ))}
      </nav>

      {opts.desktop && (
        <button
          type="button"
          onClick={onToggle}
          aria-label={collapsed ? "Expandir menu" : "Recolher menu"}
          className="absolute -right-3 top-20 z-50 flex size-6 items-center justify-center rounded-full border bg-base-100 text-base-content/50 shadow-sm transition-all hover:bg-base-200 hover:text-base-content"
          style={{ borderColor: "var(--sidebar-border)" }}
        >
          <ChevronLeft
            className={clsx("size-3.5 transition-transform duration-300", collapsed && "rotate-180")}
          />
        </button>
      )}
    </>
  );

  return (
    <>
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.button
              type="button"
              aria-label="Fechar menu"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-40 bg-base-content/25 backdrop-blur-[2px] lg:hidden"
              onClick={onMobileClose}
            />
            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              className="fixed top-0 z-50 flex h-screen w-[var(--sidebar-width)] flex-col border-r lg:hidden"
              style={{
                background: "var(--sidebar-bg)",
                borderColor: "var(--sidebar-border)",
              }}
            >
              {sidebarPanel({ desktop: false })}
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      <motion.aside
        layout
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className={clsx(
          "fixed top-0 z-40 hidden h-screen flex-col border-r lg:flex",
          collapsed ? "w-[var(--sidebar-collapsed)]" : "w-[var(--sidebar-width)]",
        )}
        style={{
          background: "var(--sidebar-bg)",
          borderColor: "var(--sidebar-border)",
        }}
      >
        {sidebarPanel({ desktop: true })}
      </motion.aside>

      {collapsed && flyout && (
        <SidebarFlyout route={flyout.route} anchorTop={flyout.top} onClose={() => setFlyout(null)} />
      )}
    </>
  );
}
