import { LoginForm } from "@/app/(auth)/login/LoginForm";
import { ThemeToggle } from "@/shared/components/layout/ThemeToggle";

export default function LoginPage() {
  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      <section className="relative hidden overflow-hidden lg:flex lg:flex-col lg:justify-between">
        <div className="absolute inset-0 bg-neutral" />
        <div
          className="absolute inset-0 opacity-90"
          style={{
            background:
              "radial-gradient(ellipse at 20% 25%, color-mix(in oklch, var(--color-primary) 50%, transparent), transparent 55%), radial-gradient(ellipse at 80% 75%, color-mix(in oklch, var(--color-accent) 35%, transparent), transparent 50%)",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-neutral/90 via-neutral/10 to-transparent" />

        <div className="relative z-10 flex flex-1 flex-col justify-center px-14 xl:px-20">
          <div className="mb-8 flex size-10 items-center justify-center rounded-xl bg-primary shadow-lg shadow-primary/25">
            <span className="text-sm font-bold text-primary-content">G</span>
          </div>
          <h1 className="max-w-lg text-4xl font-bold leading-[1.08] tracking-tight text-neutral-content xl:text-[2.75rem]">
            RH moderno para equipes que exigem precisão.
          </h1>
          <p className="mt-5 max-w-md text-sm leading-relaxed text-neutral-content/75">
            Interface inspirada nos melhores dashboards enterprise — clara, rápida e feita para o dia a dia do
            departamento pessoal.
          </p>
        </div>

        <p className="relative z-10 px-14 pb-10 text-xs text-neutral-content/50 xl:px-20">
          © {new Date().getFullYear()} Gommo
        </p>
      </section>

      <section className="relative flex items-center justify-center bg-base-200 px-6 py-12 sm:px-10">
        <div className="absolute right-5 top-5">
          <ThemeToggle />
        </div>

        <div className="w-full max-w-[22rem]">
          <div className="mb-8 text-center lg:hidden">
            <div className="mx-auto mb-3 flex size-10 items-center justify-center rounded-xl bg-primary shadow-sm">
              <span className="text-sm font-bold text-primary-content">G</span>
            </div>
            <h1 className="text-xl font-bold tracking-tight">Gommo</h1>
            <p className="mt-0.5 text-xs text-base-content/50">Departamento Pessoal</p>
          </div>

          <div className="surface-card p-7 md:p-8">
            <h2 className="text-xl font-bold tracking-tight">Entrar</h2>
            <p className="mt-1 text-sm text-base-content/50">Acesse com suas credenciais corporativas</p>
            <div className="mt-6">
              <LoginForm />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
