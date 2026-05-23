import { InputsPlaygroundClient } from "@/app/(system)/dev/inputs/InputsPlaygroundClient";
import { PageHeader } from "@/shared/components/layout/PageHeader";
import { PageTransition } from "@/shared/components/layout/PageTransition";

export default function DevInputsPage() {
  return (
    <PageTransition>
      <PageHeader
        title="Laboratório de inputs"
        description="Teste InputBase, campos tipados, InputSelect, InputAutocomplete e o híbrido com dados de Colaboradores."
      />
      <InputsPlaygroundClient />
    </PageTransition>
  );
}
