import { ModuleEnum, ModuleEnumHelper, type TModule } from "@/modules/root/enum/ModuleEnum";
import { payrollRoutes } from "@/modules/payroll/config/payroll.routes";

export const payrollModule: TModule = {
    infos: ModuleEnumHelper.getById(ModuleEnum.PAYROLL),
    routes: payrollRoutes,
};
