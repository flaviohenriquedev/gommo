export class Person {
    id!: string;
    status!: "ACTIVE" | "INACTIVE" | "DELETED";
    fullName!: string;
    socialName?: string;
    cpf!: string;
    rg?: string;
    birthDate!: string;
    gender?: "MALE" | "FEMALE" | "OTHER" | "NOT_INFORMED";
    maritalStatus?: "SINGLE" | "MARRIED" | "DIVORCED" | "WIDOWED" | "OTHER";
    motherName?: string;
    fatherName?: string;
    nationality?: string;
    pisPasep?: string;
    createdAt?: string;
    updatedAt?: string;
}

export type PersonWriteDto = PersonCreateDto;

export class PersonCreateDto {
    fullName!: string;
    socialName?: string;
    cpf!: string;
    rg?: string;
    birthDate!: string;
    gender?: Person["gender"];
    maritalStatus?: Person["maritalStatus"];
    motherName?: string;
    fatherName?: string;
    nationality?: string;
    pisPasep?: string;
}
