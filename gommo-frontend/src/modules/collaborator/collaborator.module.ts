import { ModuleEnum, ModuleEnumHelper, type TModule } from "@/modules/root/enum/ModuleEnum";
import { collaboratorRoutes } from "@/modules/collaborator/config/collaborator.routes";

export const collaboratorModule: TModule = {
    infos: ModuleEnumHelper.getById(ModuleEnum.COLLABORATOR),
    routes: collaboratorRoutes,
};
