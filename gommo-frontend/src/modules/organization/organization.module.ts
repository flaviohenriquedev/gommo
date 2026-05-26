import { ModuleEnum, ModuleEnumHelper, type TModule } from "@/modules/root/enum/ModuleEnum";
import { organizationRoutes } from "@/modules/organization/config/organization.routes";

export const organizationModule: TModule = {
    infos: ModuleEnumHelper.getById(ModuleEnum.ORGANIZATION),
    routes: organizationRoutes,
};
