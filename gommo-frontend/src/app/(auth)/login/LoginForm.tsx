"use client";

import {motion} from "framer-motion";
import {signIn} from "next-auth/react";
import {useRouter} from "next/navigation";
import {useState} from "react";
import {toast} from "sonner";
import {Button} from "@/shared/components/ui/Button";

export function LoginForm() {
    const router = useRouter();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setLoading(true);
        const result = await signIn("credentials", {
            username,
            password,
            redirect: false,
        });
        setLoading(false);

        if (result?.error) {
            toast.error("Usuário ou senha inválidos");
            return;
        }

        toast.success("Bem-vindo ao Gommo");
        router.push("/dashboard");
        router.refresh();
    }

    return (
        <motion.form
            initial={{opacity: 0, y: 10}}
            animate={{opacity: 1, y: 0}}
            transition={{duration: 0.4, ease: [0.22, 1, 0.36, 1]}}
            onSubmit={handleSubmit}
            className="grid gap-4"
        >
            <label className="grid gap-1.5">
                <span className="text-xs font-semibold text-base-content/60">Usuário</span>
                <input
                    type="text"
                    className="gommo-input w-full px-4"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    autoComplete="username"
                    required
                />
            </label>

            <label className="grid gap-1.5">
                <span className="text-xs font-semibold text-base-content/60">Senha</span>
                <input
                    type="password"
                    className="gommo-input w-full px-4"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    autoComplete="current-password"
                    required
                />
            </label>

            <Button type="submit" className="mt-2 w-full" size="lg" loading={loading}>
                Entrar
            </Button>

            {process.env.NODE_ENV === "development" && (
        <p className="text-center text-[11px] text-base-content/40">
          Desenvolvimento: use as credenciais definidas no seu .env.local / DEV_ADMIN_PASSWORD
        </p>
      )}
        </motion.form>
    );
}
