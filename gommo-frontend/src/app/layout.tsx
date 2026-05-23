import type {Metadata} from "next";
import {Inter} from "next/font/google";
import "./globals.css";
import {AppProviders} from "@/shared/components/providers/AppProviders";

const inter = Inter({
    subsets: ["latin"],
    variable: "--font-inter",
    display: "swap",
});

export const metadata: Metadata = {
    title: "Gommo — Departamento Pessoal",
    description: "Sistema de gestão de RH e departamento pessoal",
};

export default function RootLayout({children}: Readonly<{ children: React.ReactNode }>) {
    return (
        <html lang="pt-BR" suppressHydrationWarning>
        <body className={`${inter.variable} min-h-full bg-base-200 antialiased`}>
        <AppProviders>{children}</AppProviders>
        </body>
        </html>
    );
}
