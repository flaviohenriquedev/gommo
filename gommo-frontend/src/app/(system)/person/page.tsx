import {UserPlus} from "lucide-react";
import {PersonListClient} from "@/modules/person/components/PersonListClient";
import {PageHeader} from "@/shared/components/layout/PageHeader";
import {PageTransition} from "@/shared/components/layout/PageTransition";
import {Button} from "@/shared/components/ui/Button";
import {Card} from "@/shared/components/ui/Card";

export default function PersonPage() {
    return (
        <PageTransition>
            <PageHeader
                title="Pessoas"
                description="Cadastro de pessoas físicas — módulo Person."
                actions={
                    <Button leftIcon={<UserPlus className="size-4"/>} size="sm">
                        Nova pessoa
                    </Button>
                }
            />

            <Card bodyClassName="!p-0">
                <PersonListClient/>
            </Card>
        </PageTransition>
    );
}
