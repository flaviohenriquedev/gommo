"use client";

import {use} from "react";
import {PERSON_TABLE_COLUMNS} from "@/modules/person/config/person.table-columns";
import type {Person} from "@/modules/person/dto/person.dto";
import {DataTable} from "@/shared/components/ui/DataTable";

type PersonAsyncSectionProps = {
    promise: Promise<Person[]>;
};

/** Client boundary para `use()` + tabela — use dentro de Suspense no servidor. */
export function PersonAsyncSection({promise}: PersonAsyncSectionProps) {
    const persons = use(promise);
    return (
        <DataTable<Person>
            data={persons}
            columns={PERSON_TABLE_COLUMNS}
            rowKey="id"
            emptyMessage="Nenhuma pessoa cadastrada."
        />
    );
}
