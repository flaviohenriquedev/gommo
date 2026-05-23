import type { ReactNode } from "react";
import { SystemShell } from "@/shared/components/layout/SystemShell";

export default function SystemLayout({ children }: { children: ReactNode }) {
  return <SystemShell>{children}</SystemShell>;
}
