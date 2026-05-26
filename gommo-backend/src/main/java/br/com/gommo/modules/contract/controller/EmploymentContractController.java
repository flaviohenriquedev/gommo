package br.com.gommo.modules.contract.controller;
import br.com.gommo.core.base.controller.BaseController;
import br.com.gommo.modules.contract.dto.EmploymentContractRequestDto;
import br.com.gommo.modules.contract.dto.EmploymentContractResponseDto;
import br.com.gommo.modules.contract.service.IEmploymentContractService;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
@RestController @RequestMapping("/api/v1/contracts")
public class EmploymentContractController extends BaseController<EmploymentContractRequestDto, EmploymentContractResponseDto> {
    public EmploymentContractController(IEmploymentContractService service) { super(service); }
}
