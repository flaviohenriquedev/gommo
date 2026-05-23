import type {Person, PersonCreateDto} from "@/modules/person/dto/person.dto";
import {digitsOnly} from "@/shared/lib/input/digits";
import {unmaskRg} from "@/shared/lib/input/rg";

export function personToFormDto(person: Person): PersonCreateDto {
    return {
        fullName: person.fullName,
        socialName: person.socialName,
        cpf: digitsOnly(person.cpf),
        rg: person.rg ? unmaskRg(person.rg) : person.rg,
        birthDate: person.birthDate?.slice(0, 10) ?? "",
        gender: person.gender,
        maritalStatus: person.maritalStatus,
        motherName: person.motherName,
        fatherName: person.fatherName,
        nationality: person.nationality,
        pisPasep: person.pisPasep,
    };
}

export const emptyPersonForm = (): PersonCreateDto => ({
    fullName: "",
    cpf: "",
    birthDate: "",
});
