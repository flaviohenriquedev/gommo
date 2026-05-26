package br.com.gommo.modules.company.controller;

import br.com.gommo.core.base.controller.BaseController;
import br.com.gommo.modules.company.dto.CompanyRequestDto;
import br.com.gommo.modules.company.dto.CompanyResponseDto;
import br.com.gommo.modules.company.service.ICompanyService;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/companies")
public class CompanyController extends BaseController<CompanyRequestDto, CompanyResponseDto> {

    public CompanyController(ICompanyService service) {
        super(service);
    }
}
