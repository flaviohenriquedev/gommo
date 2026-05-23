import {PersonFormClient} from "@/modules/person/components/PersonFormClient";
import {PersonListClient} from "@/modules/person/components/PersonListClient";
import {CrudScreen} from "@/shared/components/crud/CrudScreen";
import {PageHeader} from "@/shared/components/layout/PageHeader";
import {PageTransition} from "@/shared/components/layout/PageTransition";
import {Card} from "@/shared/components/ui/Card";

export default function PersonPage() {
    return (
        <PageTransition>
            <PageHeader
                title="Pessoas"
                description="Cadastro e gestão de pessoas físicas no módulo Person."
            />

            <Card bodyClassName="!p-0">
                <CrudScreen list={<PersonListClient/>} form={<PersonFormClient/>}/>
            </Card>
        </PageTransition>
    );
}
