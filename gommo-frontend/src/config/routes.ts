import type {LucideIcon} from "lucide-react";
import {
    BarChart3,
    Briefcase,
    CalendarDays,
    ClipboardList,
    FileText,
    Gift,
    LayoutDashboard,
    Receipt,
    UserCircle,
    Users,
} from "lucide-react";

export type AppRoute = {
    id: string;
    label: string;
    href?: string;
    icon: LucideIcon;
    permission?: string;
    children?: AppRoute[];
};

export const APP_ROUTES: AppRoute[] = [
    {
        id: "dashboard",
        label: "Dashboard",
        href: "/dashboard",
        icon: LayoutDashboard,
    },
    {
        id: "person",
        label: "Pessoas",
        href: "/person",
        icon: UserCircle,
        permission: "person:read",
    },
    {
        id: "employee",
        label: "Funcionários",
        icon: Users,
        permission: "person:read",
        children: [
            {id: "employee-list", label: "Cadastro", href: "/employee", icon: Users},
            {id: "employee-history", label: "Histórico", href: "/employee/history", icon: ClipboardList},
        ],
    },
    {
        id: "contract",
        label: "Contratos",
        href: "/contract",
        icon: Briefcase,
    },
    {
        id: "attendance",
        label: "Ponto",
        href: "/attendance",
        icon: CalendarDays,
    },
    {
        id: "leave",
        label: "Férias e afastamentos",
        href: "/leave",
        icon: CalendarDays,
    },
    {
        id: "payroll",
        label: "Folha",
        icon: Receipt,
        children: [
            {id: "payroll-run", label: "Processamento", href: "/payroll", icon: Receipt},
            {id: "payslip", label: "Holerites", href: "/payroll/payslips", icon: FileText},
        ],
    },
    {
        id: "benefit",
        label: "Benefícios",
        href: "/benefit",
        icon: Gift,
    },
    {
        id: "report",
        label: "Relatórios",
        href: "/report",
        icon: BarChart3,
    },
];

export function flattenRoutes(routes: AppRoute[], parentLabel = ""): Array<AppRoute & { searchLabel: string }> {
    const result: Array<AppRoute & { searchLabel: string }> = [];
    for (const route of routes) {
        const searchLabel = parentLabel ? `${parentLabel} › ${route.label}` : route.label;
        result.push({...route, searchLabel});
        if (route.children) {
            result.push(...flattenRoutes(route.children, route.label));
        }
    }
    return result;
}
