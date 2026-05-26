import { redirect } from "next/navigation";

/** Cadastro direto de colaborador foi removido do menu; entrada é via admissão. */
export default function CollaboratorPage() {
    redirect("/collaborator/admission");
}
