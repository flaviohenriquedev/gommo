package br.com.gommo.modules.person.exception;

import br.com.gommo.core.exception.BusinessException;
import org.springframework.http.HttpStatus;

public final class PersonException {

    private PersonException() {}

    public static BusinessException notFound() {
        return new BusinessException(
                PersonExceptions.NOT_FOUND_CODE, PersonExceptions.NOT_FOUND_MSG, HttpStatus.NOT_FOUND);
    }

    public static BusinessException cpfAlreadyExists() {
        return new BusinessException(
                PersonExceptions.CPF_ALREADY_EXISTS_CODE,
                PersonExceptions.CPF_ALREADY_EXISTS_MSG,
                HttpStatus.CONFLICT);
    }
}
