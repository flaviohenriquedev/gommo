package br.com.gommo.modules.person.service;

import br.com.gommo.core.base.service.IBaseService;
import br.com.gommo.modules.person.dto.PersonRequestDto;
import br.com.gommo.modules.person.dto.PersonResponseDto;

public interface IPersonService extends IBaseService<PersonRequestDto, PersonResponseDto> {}
