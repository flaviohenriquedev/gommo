import { LoginForm } from "@/app/(auth)/login/LoginForm";
import { GommoLogo } from "@/shared/components/layout/GommoLogo";
import { ThemeToggle } from "@/shared/components/layout/ThemeToggle";

export default function LoginPage() {
  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      <section className="relative hidden overflow-hidden lg:flex lg:flex-col lg:justify-between">
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(145deg, var(--gommo-primary-dark) 0%, var(--gommo-primary) 42%, var(--gommo-primary-light) 100%)",
          }}
        />
        <div
          className="absolute inset-0 opacity-40"
          style={{
            background:
              "radial-gradient(circle at 15% 20%, white 0%, transparent 45%), radial-gradient(circle at 85% 80%, var(--gommo-primary-200) 0%, transparent 50%)",
          }}
        />

        <div className="relative z-10 flex flex-1 flex-col justify-center px-14 xl:px-20">
          <GommoLogo onBrand className="mb-8 h-12 max-w-[180px]" />
          <h1 className="max-w-lg text-4xl font-bold leading-[1.08] tracking-tight text-white xl:text-[2.75rem]">
            RH moderno para equipes que exigem precisão.
          </h1>
          <p className="mt-5 max-w-md text-sm leading-relaxed text-white/80">
            Interface clara e consistente — feita para o dia a dia do departamento pessoal.
          </p>
        </div>

        <p className="relative z-10 px-14 pb-10 text-xs text-white/55 xl:px-20">
          © {new Date().getFullYear()} Gommo
        </p>
      </section>

      <section className="relative flex items-center justify-center bg-[var(--color-page)] px-6 py-12 sm:px-10">
        <div className="absolute right-5 top-5">
          <ThemeToggle />
        </div>

        <div className="w-full max-w-[24rem]">
          <div className="mb-8 flex flex-col items-center lg:hidden">
            <GommoLogo className="mx-auto h-10 max-w-[140px] object-contain" />
            <h1 className="sr-only">Gommo</h1>
            <p className="mt-3 text-sm text-base-content/50">Departamento Pessoal</p>
          </div>

          <div className="surface-card p-8">
            <h2 className="text-xl font-bold tracking-tight">Entrar</h2>
            <p className="mt-1 text-sm text-base-content/55">Acesse com suas credenciais corporativas</p>
            <div className="mt-6">
              <LoginForm />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
