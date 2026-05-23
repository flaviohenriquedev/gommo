"use client";

import {personKeys} from "@/modules/person/person.query";
import {personService} from "@/modules/person/services/person.service";
import {PersonTable} from "@/modules/person/components/PersonTable";
import {QueryPanel} from "@/shared/components/data/DataPanel";

/** Lista com React Query (cache + reload). */
export function PersonListClient() {
    return (
        <QueryPanel queryKey={personKeys.all} request={() => personService.getAll()}>
            {({data}) => <PersonTable persons={data}/>}
        </QueryPanel>
    );
}
