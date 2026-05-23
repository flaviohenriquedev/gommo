"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState, type FormEvent } from "react";
import { toast } from "sonner";
import { PERSON_CLIENT_MESSAGES } from "@/modules/person/exceptions/person.messages";
import type { PersonCreateDto } from "@/modules/person/dto/person.dto";
import { emptyPersonForm, personToFormDto } from "@/modules/person/lib/person.mapper";
import { personKeys } from "@/modules/person/person.query";
import { personService } from "@/modules/person/services/person.service";
import { useCrudScreen } from "@/shared/components/crud/CrudScreen";
import { ExceptionCapture } from "@/shared/exceptions";
import { Button } from "@/shared/components/ui/Button";
import {
  InputCPF,
  InputDate,
  InputRG,
  InputSelect,
  InputString,
} from "@/shared/components/ui/input/index";
import type { SelectItem } from "@/shared/components/ui/input/select-item.types";

const GENDER_ITEMS: SelectItem[] = [
  { value: "MALE", label: "Masculino" },
  { value: "FEMALE", label: "Feminino" },
  { value: "OTHER", label: "Outro" },
  { value: "NOT_INFORMED", label: "Prefere não informar" },
];

const MARITAL_ITEMS: SelectItem[] = [
  { value: "SINGLE", label: "Solteiro(a)" },
  { value: "MARRIED", label: "Casado(a)" },
  { value: "DIVORCED", label: "Divorciado(a)" },
  { value: "WIDOWED", label: "Viúvo(a)" },
  { value: "OTHER", label: "Outro" },
];

export function PersonFormClient() {
  const { editingId, isEditing, goToList, startCreate } = useCrudScreen();
  const queryClient = useQueryClient();
  const [form, setForm] = useState<PersonCreateDto>(emptyPersonForm);
  const [error, setError] = useState<string | null>(null);

  const detailQuery = useQuery({
    queryKey: personKeys.detail(editingId ?? ""),
    queryFn: () => personService.getById(editingId!),
    enabled: isEditing && Boolean(editingId),
  });

  useEffect(() => {
    if (!isEditing) {
      setForm(emptyPersonForm());
      setError(null);
      return;
    }
    if (detailQuery.data) {
      setForm(personToFormDto(detailQuery.data));
      setError(null);
    }
  }, [isEditing, detailQuery.data]);

  const saveMutation = useMutation({
    mutationFn: async (dto: PersonCreateDto) => {
      const payload: PersonCreateDto = {
        ...dto,
        gender: dto.gender || undefined,
        maritalStatus: dto.maritalStatus || undefined,
      };
      if (isEditing && editingId) {
        return personService.update(editingId, payload);
      }
      return personService.create(payload);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: personKeys.all });
      if (editingId) {
        await queryClient.invalidateQueries({ queryKey: personKeys.detail(editingId) });
      }
      toast.success(isEditing ? "Pessoa atualizada" : "Pessoa cadastrada");
      setForm(emptyPersonForm());
      setError(null);
      goToList();
    },
    onError: (err: unknown) => {
      const ex = ExceptionCapture.handle(err, {
        fallbackMessage: PERSON_CLIENT_MESSAGES.PERSON_SAVE_FAILED,
      });
      setError(ex.displayMessage);
    },
  });

  const update = <K extends keyof PersonCreateDto>(field: K, value: PersonCreateDto[K]) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    saveMutation.mutate(form);
  };

  if (isEditing && detailQuery.isLoading) {
    return (
      <div className="grid gap-2 p-5">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="skeleton-shimmer h-10 w-full" />
        ))}
      </div>
    );
  }

  if (isEditing && detailQuery.isError) {
    return (
      <div className="p-5">
        <p className="text-sm font-medium text-error">
          {ExceptionCapture.displayMessage(
            detailQuery.error,
            PERSON_CLIENT_MESSAGES.PERSON_LOAD_FAILED,
          )}
        </p>
        <Button variant="ghost" size="sm" className="mt-3" onClick={goToList}>
          Voltar
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-4 p-5 sm:grid-cols-2">
      <div className="sm:col-span-2">
        <p className="text-sm font-semibold text-base-content">
          {isEditing ? "Editar pessoa" : "Nova pessoa"}
        </p>
        <p className="text-xs text-base-content/45">
          Campos obrigatórios: nome completo, CPF e data de nascimento.
        </p>
      </div>

      <InputString
        label="Nome completo"
        value={form.fullName}
        onValueChange={(fullName) => update("fullName", fullName)}
        required
        wrapperClassName="sm:col-span-2"
      />
      <InputString
        label="Nome social"
        value={form.socialName ?? ""}
        onValueChange={(socialName) => update("socialName", socialName)}
      />
      <InputCPF
        label="CPF"
        value={form.cpf}
        onValueChange={(cpf) => update("cpf", cpf)}
        required
        hint="Salvo apenas com dígitos"
      />
      <InputRG
        label="RG"
        value={form.rg ?? ""}
        onValueChange={(rg) => update("rg", rg)}
      />
      <InputDate
        label="Data de nascimento"
        value={form.birthDate}
        onValueChange={(birthDate) => update("birthDate", birthDate)}
        required
      />
      <InputSelect
        label="Gênero"
        items={GENDER_ITEMS}
        value={form.gender ?? ""}
        onValueChange={(v) => update("gender", (v || undefined) as PersonCreateDto["gender"])}
        placeholder="Não informado"
        clearable
      />
      <InputSelect
        label="Estado civil"
        items={MARITAL_ITEMS}
        value={form.maritalStatus ?? ""}
        onValueChange={(v) =>
          update("maritalStatus", (v || undefined) as PersonCreateDto["maritalStatus"])
        }
        placeholder="Não informado"
        clearable
      />
      <InputString
        label="Nacionalidade"
        value={form.nationality ?? ""}
        onValueChange={(nationality) => update("nationality", nationality)}
      />
      <InputString
        label="PIS/PASEP"
        value={form.pisPasep ?? ""}
        onValueChange={(pisPasep) => update("pisPasep", pisPasep)}
      />
      <InputString
        label="Nome da mãe"
        value={form.motherName ?? ""}
        onValueChange={(motherName) => update("motherName", motherName)}
        wrapperClassName="sm:col-span-2"
      />
      <InputString
        label="Nome do pai"
        value={form.fatherName ?? ""}
        onValueChange={(fatherName) => update("fatherName", fatherName)}
        wrapperClassName="sm:col-span-2"
      />

      {error && <p className="text-sm font-medium text-error sm:col-span-2">{error}</p>}

      <div className="flex flex-wrap gap-2 sm:col-span-2">
        <Button type="submit" loading={saveMutation.isPending}>
          {isEditing ? "Salvar alterações" : "Cadastrar"}
        </Button>
        <Button type="button" variant="ghost" onClick={goToList}>
          Cancelar
        </Button>
        {isEditing && (
          <Button type="button" variant="outline" onClick={startCreate}>
            Novo cadastro
          </Button>
        )}
      </div>
    </form>
  );
}
