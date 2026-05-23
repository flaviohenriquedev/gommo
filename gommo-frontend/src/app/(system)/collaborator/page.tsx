import {CollaboratorFormClient} from "@/modules/collaborator/components/CollaboratorFormClient";
import {CollaboratorListClient} from "@/modules/collaborator/components/CollaboratorListClient";
import {CrudScreen} from "@/shared/components/crud/CrudScreen";
import {PageHeader} from "@/shared/components/layout/PageHeader";
import {PageTransition} from "@/shared/components/layout/PageTransition";
import {Card} from "@/shared/components/ui/Card";

export default function CollaboratorPage() {
    return (
        <PageTransition>
            <PageHeader
                title="Colaboradores"
                description="Cadastro e gestão de colaboradores."
            />

            <Card bodyClassName="!p-0">
                <CrudScreen list={<CollaboratorListClient/>} form={<CollaboratorFormClient/>}/>
            </Card>
        </PageTransition>
    );
}
