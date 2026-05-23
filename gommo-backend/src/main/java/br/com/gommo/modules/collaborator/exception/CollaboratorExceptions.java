package br.com.gommo.modules.collaborator.exception;

/**
 * Catálogo de mensagens do módulo Collaborator (Unicode apenas em caracteres especiais).
 */
public final class CollaboratorExceptions {

    private CollaboratorExceptions() {}

    public static final String NOT_FOUND_CODE = "COLLABORATOR_NOT_FOUND";
    public static final String NOT_FOUND_MSG = "Colaborador não encontrado";

    public static final String CPF_ALREADY_EXISTS_CODE = "COLLABORATOR_CPF_ALREADY_EXISTS";
    public static final String CPF_ALREADY_EXISTS_MSG = "CPF j\u00e1 cadastrado";
}
