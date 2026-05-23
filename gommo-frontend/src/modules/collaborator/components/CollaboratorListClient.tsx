"use client";

import {useMutation, useQueryClient} from "@tanstack/react-query";
import {Pencil, Trash2} from "lucide-react";
import {toast} from "sonner";
import {COLLABORATOR_CLIENT_MESSAGES} from "@/modules/collaborator/exceptions/collaborator.messages";
import {COLLABORATOR_TABLE_COLUMNS} from "@/modules/collaborator/config/collaborator.table-columns";
import type {Collaborator} from "@/modules/collaborator/dto/collaborator.dto";
import {collaboratorKeys} from "@/modules/collaborator/collaborator.query";
import {collaboratorService} from "@/modules/collaborator/services/collaborator.service";
import {useCrudScreen} from "@/shared/components/crud/CrudScreen";
import {QueryPanel} from "@/shared/components/data/DataPanel";
import {Button} from "@/shared/components/ui/Button";
import {DataTable} from "@/shared/components/ui/DataTable";
import {ExceptionCapture} from "@/shared/exceptions";

export function CollaboratorListClient() {
    const {startEdit} = useCrudScreen();
    const queryClient = useQueryClient();

    const deleteMutation = useMutation({
        mutationFn: (id: string) => collaboratorService.remove(id),
        onSuccess: async () => {
            await queryClient.invalidateQueries({queryKey: collaboratorKeys.all});
            toast.success("Colaborador excluído");
        },
        onError: (err: unknown) =>
            ExceptionCapture.handle(err, {fallbackMessage: COLLABORATOR_CLIENT_MESSAGES.COLLABORATOR_LOAD_FAILED}),
    });

    const handleDelete = (collaborator: Collaborator) => {
        const confirmed = window.confirm(
            `Excluir "${collaborator.fullName}"? Esta ação não pode ser desfeita.`,
        );
        if (!confirmed) return;
        deleteMutation.mutate(collaborator.id);
    };

    return (
        <QueryPanel queryKey={collaboratorKeys.all} request={() => collaboratorService.getAll()}>
            {({data}) => (
                <DataTable<Collaborator>
                    data={data}
                    columns={COLLABORATOR_TABLE_COLUMNS}
                    rowKey="id"
                    emptyMessage="Nenhuma Colaborador cadastrado."
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
