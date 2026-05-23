import type {CSSProperties} from "react";
import {LayoutDashboard, Palmtree, TrendingUp, Users, Wallet} from "lucide-react";
import {PageHeader} from "@/shared/components/layout/PageHeader";
import {PageTransition} from "@/shared/components/layout/PageTransition";
import {Card} from "@/shared/components/ui/Card";
import {Button} from "@/shared/components/ui/Button";

const metrics = [
    {label: "Pessoas", value: "—", icon: Users},
    {label: "Funcionários", value: "—", icon: LayoutDashboard},
    {label: "Folha aberta", value: "—", icon: Wallet},
    {label: "Férias pendentes", value: "—", icon: Palmtree},
] as const;

export default function DashboardPage() {
    return (
        <PageTransition>
            <PageHeader
                title="Dashboard"
                description="Visão geral do departamento pessoal."
                actions={<Button size="sm">Relatório</Button>}
            />

            <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
                {metrics.map((card, index) => {
                    const Icon = card.icon;
                    return (
                        <Card key={card.label} delay={index * 0.05} bodyClassName="!p-5">
                            <div className="flex items-start justify-between gap-3">
                                <div>
                                    <p className="text-xs font-semibold text-base-content/45">{card.label}</p>
                                    <p className="mt-2 text-4xl font-bold tracking-tight tabular-nums">{card.value}</p>
                                </div>
                                <span
                                    className="flex size-11 shrink-0 items-center justify-center rounded-box bg-base-200 text-base-content/50">
                  <Icon className="size-5" strokeWidth={2}/>
                </span>
                            </div>
                        </Card>
                    );
                })}
            </div>

            <div className="grid gap-5 lg:grid-cols-[1.4fr_1fr]">
                <Card delay={0.2} title="Atividade" subtitle="Últimos 7 dias">
                    <div className="flex h-40 items-end justify-between gap-2 px-1 pt-4">
                        {[40, 65, 45, 80, 55, 90, 70].map((h, i) => (
                            <div
                                key={i}
                                className="w-full max-w-10 rounded-t-box bg-base-content"
                                style={{height: `${h}%`}}
                            />
                        ))}
                    </div>
                </Card>

                <Card delay={0.25} title="Resumo" subtitle="Indicadores rápidos">
                    <div className="grid gap-4">
                        <div className="flex items-center gap-4 rounded-box bg-base-200 p-4">
                            <div
                                className="radial-progress text-base-content"
                                style={{"--value": 91, "--size": "4.5rem", "--thickness": "5px"} as CSSProperties}
                                role="progressbar"
                            >
                                91
                            </div>
                            <div>
                                <p className="text-sm font-bold">Saúde do módulo</p>
                                <p className="text-xs text-base-content/50">Fase 01 estável</p>
                            </div>
                        </div>
                        <div className="flex items-center justify-between rounded-box bg-primary/15 px-4 py-3">
                            <span className="text-xs font-semibold text-base-content/70">Crescimento</span>
                            <span className="flex items-center gap-1 text-sm font-bold text-base-content">
                <TrendingUp className="size-4"/>
                +12%
              </span>
                        </div>
                        <Button variant="primary" className="w-full">
                            Ver detalhes
                        </Button>
                    </div>
                </Card>
            </div>
        </PageTransition>
    );
}
