import type {LucideIcon} from "lucide-react";
import {
    BarChart3,
    Briefcase,
    CalendarDays,
    ClipboardList,
    FileText,
    FlaskConical,
    Gift,
    LayoutDashboard,
    Receipt,
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

export type NavSection = {
    id: string;
    label: string;
    routes: AppRoute[];
};

export const NAV_SECTIONS: NavSection[] = [
    {
        id: "overview",
        label: "Visão geral",
        routes: [
            {id: "dashboard", label: "Dashboard", href: "/dashboard", icon: LayoutDashboard},
            {id: "dev-inputs", label: "Inputs (dev)", href: "/dev/inputs", icon: FlaskConical},
        ],
    },
    {
        id: "people",
        label: "Colaboradores e vínculos",
        routes: [
            {
                id: "collaborator",
                label: "Colaboradores",
                icon: Users,
                permission: "collaborator:read",
                children: [
                    {id: "collaborator-list", label: "Cadastro", href: "/collaborator", icon: Users},
                    {id: "collaborator-history", label: "Histórico", href: "/collaborator/history", icon: ClipboardList},
                ],
            },
            {id: "contract", label: "Contratos", href: "/contract", icon: Briefcase},
            {id: "attendance", label: "Ponto", href: "/attendance", icon: CalendarDays},
            {id: "leave", label: "Férias e afastamentos", href: "/leave", icon: CalendarDays},
        ],
    },
    {
        id: "payroll",
        label: "Folha e benefícios",
        routes: [
            {
                id: "payroll",
                label: "Folha",
                icon: Receipt,
                children: [
                    {id: "payroll-run", label: "Processamento", href: "/payroll", icon: Receipt},
                    {id: "payslip", label: "Holerites", href: "/payroll/payslips", icon: FileText},
                ],
            },
            {id: "benefit", label: "Benefícios", href: "/benefit", icon: Gift},
        ],
    },
    {
        id: "insights",
        label: "Insights",
        routes: [{id: "report", label: "Relatórios", href: "/report", icon: BarChart3}],
    },
];

/** Lista plana para busca e compatibilidade */
export const APP_ROUTES: AppRoute[] = NAV_SECTIONS.flatMap((s) => s.routes);

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
