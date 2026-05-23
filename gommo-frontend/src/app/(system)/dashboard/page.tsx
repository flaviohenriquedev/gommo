import type {CSSProperties} from "react";
import {LayoutDashboard, Users, Wallet, Palmtree, TrendingUp, ArrowUpRight} from "lucide-react";
import {PageHeader} from "@/shared/components/layout/PageHeader";
import {PageTransition} from "@/shared/components/layout/PageTransition";
import {Card} from "@/shared/components/ui/Card";
import {Button} from "@/shared/components/ui/Button";

const metrics = [
    {label: "Colaboradores", value: "—", delta: "+4%", icon: Users},
    {label: "Contratos ativos", value: "—", delta: "+12%", icon: LayoutDashboard},
    {label: "Folha aberta", value: "—", delta: "Em dia", icon: Wallet},
    {label: "Férias pendentes", value: "—", delta: "3 itens", icon: Palmtree},
] as const;

export default function DashboardPage() {
    return (
        <PageTransition>
            <PageHeader
                badge="Fase 01"
                title="Dashboard"
                description="Visão consolidada do departamento pessoal em tempo real."
                actions={<Button>Exportar relatório</Button>}
            />

            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                {metrics.map((card, index) => {
                    const Icon = card.icon;
                    return (
                        <Card key={card.label} delay={index * 0.05} bodyClassName="!p-5">
                            <div className="flex items-start justify-between gap-3">
                                <div>
                                    <p className="text-xs font-semibold text-base-content/45">{card.label}</p>
                                    <p className="mt-2 text-3xl font-bold tracking-tight tabular-nums">{card.value}</p>
                                    <p className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-success">
                                        <TrendingUp className="size-3.5"/>
                                        {card.delta}
                                    </p>
                                </div>
                                <span
                                    className="flex size-11 shrink-0 items-center justify-center rounded-[10px] bg-digital-blue-50 text-digital-blue-600">
                  <Icon className="size-5" strokeWidth={1.75}/>
                </span>
                            </div>
                        </Card>
                    );
                })}
            </div>

            <div className="mt-5 grid gap-4 xl:grid-cols-12">
                <Card
                    delay={0.15}
                    className="xl:col-span-8"
                    title="Movimentação"
                    subtitle="Últimos 7 dias"
                    bodyClassName="!pt-4"
                >
                    <div className="flex h-48 items-end justify-between gap-2 px-1">
                        {[38, 62, 44, 78, 52, 88, 70].map((h, i) => (
                            <div key={i} className="flex flex-1 flex-col items-center gap-2">
                                <div
                                    className="w-full max-w-10 rounded-t-[10px] bg-digital-blue-500 transition-all duration-500"
                                    style={{height: `${h}%`}}
                                />
                            </div>
                        ))}
                    </div>
                </Card>

                <Card delay={0.2} className="xl:col-span-4" title="Saúde do sistema" subtitle="Indicadores">
                    <div className="flex flex-col items-center gap-5">
                        <div
                            className="radial-progress font-bold text-base-content"
                            style={{"--value": 91, "--size": "5.5rem", "--thickness": "6px"} as CSSProperties}
                            role="progressbar"
                        >
                            91
                        </div>
                        <div className="w-full space-y-3">
                            <div
                                className="flex items-center justify-between rounded-[10px] bg-digital-blue-50/80 px-3 py-2.5 text-xs">
                                <span className="font-medium text-base-content/60">Módulos ativos</span>
                                <span className="font-bold">12</span>
                            </div>
                            <div
                                className="flex items-center justify-between rounded-[10px] border border-digital-blue-200 bg-digital-blue-50 px-3 py-2.5 text-xs">
                                <span className="font-medium text-base-content/70">Performance</span>
                                <span className="inline-flex items-center gap-0.5 font-bold text-primary">
                  Alta
                  <ArrowUpRight className="size-3.5"/>
                </span>
                            </div>
                        </div>
                        <Button variant="primary" className="w-full" size="sm">
                            Ver detalhes
                        </Button>
                    </div>
                </Card>
            </div>
        </PageTransition>
    );
}
