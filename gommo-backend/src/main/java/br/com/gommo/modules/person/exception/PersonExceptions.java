package br.com.gommo.modules.person.exception;

/**
 * Catálogo de mensagens do módulo Person (Unicode apenas em caracteres especiais).
 */
public final class PersonExceptions {

    private PersonExceptions() {}

    public static final String NOT_FOUND_CODE = "PERSON_NOT_FOUND";
    public static final String NOT_FOUND_MSG = "Pessoa n\u00e3o encontrada";

    public static final String CPF_ALREADY_EXISTS_CODE = "PERSON_CPF_ALREADY_EXISTS";
    public static final String CPF_ALREADY_EXISTS_MSG = "CPF j\u00e1 cadastrado";
}
