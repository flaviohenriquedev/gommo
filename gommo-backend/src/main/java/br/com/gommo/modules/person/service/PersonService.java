package br.com.gommo.modules.person.service;

import br.com.gommo.core.base.dto.PageableResponseDto;
import br.com.gommo.core.base.service.BaseService;
import br.com.gommo.core.entity.StatusEnum;
import br.com.gommo.core.exception.BusinessException;
import br.com.gommo.modules.person.dto.PersonRequestDto;
import br.com.gommo.modules.person.dto.PersonResponseDto;
import br.com.gommo.modules.person.entity.Person;
import br.com.gommo.modules.person.mapper.PersonMapper;
import br.com.gommo.modules.person.repository.PersonRepository;
import java.util.List;
import java.util.UUID;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class PersonService extends BaseService<Person, PersonRequestDto, PersonResponseDto> implements IPersonService {

    private final PersonRepository personRepository;
    private final PersonMapper personMapper;

    public PersonService(PersonRepository personRepository, PersonMapper personMapper) {
        super(
                personRepository,
                personMapper::toResponse,
                personMapper::toEntity,
                "PERSON_NOT_FOUND",
                "Person not found");
        this.personRepository = personRepository;
        this.personMapper = personMapper;
    }

    @Override
    @Transactional(readOnly = true)
    @PreAuthorize("hasAuthority('person:read')")
    public List<PersonResponseDto> findAll() {
        return super.findAll();
    }

    @Override
    @Transactional(readOnly = true)
    @PreAuthorize("hasAuthority('person:read')")
    public PersonResponseDto findById(UUID id) {
        return super.findById(id);
    }

    @Override
    @Transactional(readOnly = true)
    @PreAuthorize("hasAuthority('person:read')")
    public PageableResponseDto<PersonResponseDto> findPage(int page, int size) {
        return super.findPage(page, size);
    }

    @Override
    @Transactional
    @PreAuthorize("hasAuthority('person:write')")
    public PersonResponseDto create(PersonRequestDto request) {
        personRepository
                .findByCpfAndStatusNot(request.getCpf(), StatusEnum.DELETED)
                .ifPresent(p -> {
                    throw new BusinessException("CPF_ALREADY_EXISTS", "CPF already registered");
                });
        return super.create(request);
    }

    @Override
    @Transactional
    @PreAuthorize("hasAuthority('person:write')")
    public PersonResponseDto update(UUID id, PersonRequestDto request) {
        personRepository
                .findByCpfAndStatusNot(request.getCpf(), StatusEnum.DELETED)
                .filter(existing -> !existing.getId().equals(id))
                .ifPresent(p -> {
                    throw new BusinessException("CPF_ALREADY_EXISTS", "CPF already registered");
                });
        return super.update(id, request);
    }

    @Override
    @Transactional
    @PreAuthorize("hasAuthority('person:delete')")
    public void delete(UUID id) {
        super.delete(id);
    }

    @Override
    protected void updateEntity(Person entity, PersonRequestDto request) {
        personMapper.updateEntity(entity, request);
    }
}
