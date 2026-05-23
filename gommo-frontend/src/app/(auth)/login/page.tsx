import {LoginForm} from "@/app/(auth)/login/LoginForm";
import {ThemeToggle} from "@/shared/components/layout/ThemeToggle";

export default function LoginPage() {
    return (
        <div className="grid min-h-screen bg-base-200 lg:grid-cols-2">
            <section className="relative hidden overflow-hidden lg:flex lg:flex-col lg:justify-between">
                <div className="absolute inset-0 bg-neutral"/>
                <div
                    className="absolute inset-0"
                    style={{
                        background:
                            "radial-gradient(ellipse at 25% 20%, color-mix(in oklch, var(--color-primary) 70%, transparent), transparent 50%), radial-gradient(ellipse at 75% 80%, color-mix(in oklch, var(--color-accent) 45%, transparent), transparent 55%)",
                    }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral via-neutral/20 to-transparent"/>

                <div className="relative z-10 flex flex-1 flex-col justify-center px-12 xl:px-16">
          <span
              className="mb-6 inline-flex w-fit items-center rounded-box bg-primary px-4 py-2 text-xs font-bold text-primary-content shadow-sm">
            Gommo RH
          </span>
                    <h1 className="max-w-md text-4xl font-bold leading-[1.08] tracking-tight text-neutral-content xl:text-5xl">
                        Gestão de pessoas, folha e RH em um só lugar.
                    </h1>
                    <p className="mt-5 max-w-sm text-sm leading-relaxed text-neutral-content/80">
                        O mesmo padrão visual do seu tema — limpo, moderno e pronto para escalar.
                    </p>
                </div>

                <p className="relative z-10 px-12 pb-8 text-xs text-neutral-content/50 xl:px-16">
                    © {new Date().getFullYear()} Gommo
                </p>
            </section>

            <section className="relative flex items-center justify-center px-6 py-10 sm:px-10">
                <div className="absolute right-5 top-5">
                    <ThemeToggle/>
                </div>

                <div className="w-full max-w-[24rem]">
                    <div className="mb-6 text-center lg:hidden">
            <span
                className="inline-flex size-12 items-center justify-center rounded-box bg-primary text-lg font-bold text-primary-content shadow-sm">
              G
            </span>
                        <h1 className="mt-3 text-xl font-bold">Gommo</h1>
                    </div>

                    <div className="gommo-card p-7 md:p-8">
                        <h2 className="text-xl font-bold tracking-tight">Entrar</h2>
                        <p className="mt-1 text-xs text-base-content/50">Credenciais corporativas</p>
                        <div className="mt-6">
                            <LoginForm/>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
