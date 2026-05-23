"use client";

import {useMutation, useQueryClient} from "@tanstack/react-query";
import {Pencil, Trash2} from "lucide-react";
import {toast} from "sonner";
import {PERSON_CLIENT_MESSAGES} from "@/modules/person/exceptions/person.messages";
import {PERSON_TABLE_COLUMNS} from "@/modules/person/config/person.table-columns";
import type {Person} from "@/modules/person/dto/person.dto";
import {personKeys} from "@/modules/person/person.query";
import {personService} from "@/modules/person/services/person.service";
import {useCrudScreen} from "@/shared/components/crud/CrudScreen";
import {QueryPanel} from "@/shared/components/data/DataPanel";
import {Button} from "@/shared/components/ui/Button";
import {DataTable} from "@/shared/components/ui/DataTable";
import {ExceptionCapture} from "@/shared/exceptions";

export function PersonListClient() {
    const {startEdit} = useCrudScreen();
    const queryClient = useQueryClient();

    const deleteMutation = useMutation({
        mutationFn: (id: string) => personService.remove(id),
        onSuccess: async () => {
            await queryClient.invalidateQueries({queryKey: personKeys.all});
            toast.success("Pessoa excluída");
        },
        onError: (err: unknown) =>
            ExceptionCapture.handle(err, {fallbackMessage: PERSON_CLIENT_MESSAGES.PERSON_LOAD_FAILED}),
    });

    const handleDelete = (person: Person) => {
        const confirmed = window.confirm(
            `Excluir "${person.fullName}"? Esta ação não pode ser desfeita.`,
        );
        if (!confirmed) return;
        deleteMutation.mutate(person.id);
    };

    return (
        <QueryPanel queryKey={personKeys.all} request={() => personService.getAll()}>
            {({data}) => (
                <DataTable<Person>
                    data={data}
                    columns={PERSON_TABLE_COLUMNS}
                    rowKey="id"
                    emptyMessage="Nenhuma pessoa cadastrada."
                    onRowClick={(row) => startEdit(row.id)}
                    renderActions={(row) => (
                        <>
                            <Button
                                variant="ghost"
                                size="sm"
                                aria-label={`Editar ${row.fullName}`}
                                leftIcon={<Pencil className="size-3.5"/>}
                                onClick={() => startEdit(row.id)}
                            />
                            <Button
                                variant="ghost"
                                size="sm"
                                aria-label={`Excluir ${row.fullName}`}
                                className="text-error hover:bg-error/10"
                                leftIcon={<Trash2 className="size-3.5"/>}
                                loading={deleteMutation.isPending && deleteMutation.variables === row.id}
                                onClick={() => handleDelete(row)}
                            />
                        </>
                    )}
                />
            )}
        </QueryPanel>
    );
}
