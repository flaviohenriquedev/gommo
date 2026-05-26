import { ModuleEnum, ModuleEnumHelper, type TModule } from "@/modules/root/enum/ModuleEnum";
import { insightsRoutes } from "@/modules/insights/config/insights.routes";

export const insightsModule: TModule = {
    infos: ModuleEnumHelper.getById(ModuleEnum.INSIGHTS),
    routes: insightsRoutes,
};
