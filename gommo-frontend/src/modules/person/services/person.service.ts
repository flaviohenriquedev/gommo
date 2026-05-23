import {BaseService} from "@/modules/root/services/base.service";
import type {Person, PersonCreateDto} from "@/modules/person/dto/person.dto";

class PersonService extends BaseService<Person, PersonCreateDto, PersonCreateDto> {
    constructor() {
        super("/api/v1/persons");
    }
}

export const personService = new PersonService();
