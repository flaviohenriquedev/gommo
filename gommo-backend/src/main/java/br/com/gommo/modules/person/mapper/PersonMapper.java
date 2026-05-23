package br.com.gommo.modules.person.mapper;

import br.com.gommo.modules.person.dto.PersonRequestDto;
import br.com.gommo.modules.person.dto.PersonResponseDto;
import br.com.gommo.modules.person.entity.Person;
import org.springframework.stereotype.Component;

@Component
public class PersonMapper {

    public Person toEntity(PersonRequestDto dto) {
        return Person.builder()
                .fullName(dto.getFullName())
                .socialName(dto.getSocialName())
                .cpf(dto.getCpf())
                .rg(dto.getRg())
                .birthDate(dto.getBirthDate())
                .gender(dto.getGender())
                .maritalStatus(dto.getMaritalStatus())
                .motherName(dto.getMotherName())
                .fatherName(dto.getFatherName())
                .nationality(dto.getNationality() != null ? dto.getNationality() : "Brasileiro")
                .pisPasep(dto.getPisPasep())
                .build();
    }

    public void updateEntity(Person entity, PersonRequestDto dto) {
        entity.setFullName(dto.getFullName());
        entity.setSocialName(dto.getSocialName());
        entity.setCpf(dto.getCpf());
        entity.setRg(dto.getRg());
        entity.setBirthDate(dto.getBirthDate());
        entity.setGender(dto.getGender());
        entity.setMaritalStatus(dto.getMaritalStatus());
        entity.setMotherName(dto.getMotherName());
        entity.setFatherName(dto.getFatherName());
        if (dto.getNationality() != null) {
            entity.setNationality(dto.getNationality());
        }
        entity.setPisPasep(dto.getPisPasep());
    }

    public PersonResponseDto toResponse(Person entity) {
        return PersonResponseDto.builder()
                .id(entity.getId())
                .status(entity.getStatus())
                .fullName(entity.getFullName())
                .socialName(entity.getSocialName())
                .cpf(entity.getCpf())
                .rg(entity.getRg())
                .birthDate(entity.getBirthDate())
                .gender(entity.getGender())
                .maritalStatus(entity.getMaritalStatus())
                .motherName(entity.getMotherName())
                .fatherName(entity.getFatherName())
                .nationality(entity.getNationality())
                .pisPasep(entity.getPisPasep())
                .createdAt(entity.getCreatedAt())
                .updatedAt(entity.getUpdatedAt())
                .build();
    }
}
