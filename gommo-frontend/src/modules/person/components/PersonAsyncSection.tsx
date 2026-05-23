"use client";

import { use } from "react";
import type { Person } from "@/modules/person/dto/person.dto";
import { PersonTable } from "@/modules/person/components/PersonTable";

type PersonAsyncSectionProps = {
  promise: Promise<Person[]>;
};

/** Client boundary para `use()` + tabela — use dentro de Suspense no servidor. */
export function PersonAsyncSection({ promise }: PersonAsyncSectionProps) {
  const persons = use(promise);
  return <PersonTable persons={persons} />;
}
