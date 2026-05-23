package br.com.gommo.modules.person.controller;

import br.com.gommo.core.base.controller.BaseController;
import br.com.gommo.modules.person.dto.PersonRequestDto;
import br.com.gommo.modules.person.dto.PersonResponseDto;
import br.com.gommo.modules.person.service.IPersonService;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/persons")
public class PersonController extends BaseController<PersonRequestDto, PersonResponseDto> {

    public PersonController(IPersonService personService) {
        super(personService);
    }
}
