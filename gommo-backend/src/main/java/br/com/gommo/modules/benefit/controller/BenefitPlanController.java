package br.com.gommo.modules.benefit.controller;
import br.com.gommo.core.base.controller.BaseController;
import br.com.gommo.modules.benefit.dto.BenefitPlanRequestDto;
import br.com.gommo.modules.benefit.dto.BenefitPlanResponseDto;
import br.com.gommo.modules.benefit.service.IBenefitPlanService;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
@RestController @RequestMapping("/api/v1/benefit-plans")
public class BenefitPlanController extends BaseController<BenefitPlanRequestDto, BenefitPlanResponseDto> {
    public BenefitPlanController(IBenefitPlanService service) { super(service); }
}
