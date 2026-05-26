package br.com.gommo.modules.storage.exception;

public final class StorageExceptions {

    private StorageExceptions() {}

    public static final String NOT_FOUND_CODE = "STORAGE_NOT_FOUND";
    public static final String NOT_FOUND_MSG = "Arquivo não encontrado";

    public static final String UPLOAD_FAILED_CODE = "STORAGE_UPLOAD_FAILED";
    public static final String UPLOAD_FAILED_MSG = "Falha ao enviar arquivo";

    public static final String FILE_MISSING_CODE = "STORAGE_FILE_MISSING";
    public static final String FILE_MISSING_MSG = "Arquivo físico não encontrado no storage local";
}
