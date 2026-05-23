package br.com.gommo.core.exception;

import br.com.gommo.core.security.CorrelationIdFilter;
import jakarta.servlet.http.HttpServletRequest;
import java.time.OffsetDateTime;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {

    private static final Logger log = LoggerFactory.getLogger(GlobalExceptionHandler.class);

    @ExceptionHandler(BusinessException.class)
    public ResponseEntity<ErrorResponseDto> handleBusiness(BusinessException ex, HttpServletRequest request) {
        return ResponseEntity.badRequest().body(error(ex.getCode(), ex.getMessage(), request));
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ErrorResponseDto> handleValidation(MethodArgumentNotValidException ex, HttpServletRequest request) {
        FieldError fieldError = ex.getBindingResult().getFieldError();
        String message = fieldError != null ? fieldError.getField() + ": " + fieldError.getDefaultMessage() : "Validation failed";
        return ResponseEntity.badRequest().body(error("VALIDATION_ERROR", message, request));
    }

    @ExceptionHandler({BadCredentialsException.class, AccessDeniedException.class})
    public ResponseEntity<ErrorResponseDto> handleSecurity(RuntimeException ex, HttpServletRequest request) {
        HttpStatus status = ex instanceof AccessDeniedException ? HttpStatus.FORBIDDEN : HttpStatus.UNAUTHORIZED;
        return ResponseEntity.status(status).body(error("AUTH_ERROR", ex.getMessage(), request));
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ErrorResponseDto> handleGeneric(Exception ex, HttpServletRequest request) {
        log.error("Unhandled error path={}", request.getRequestURI(), ex);
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(error("INTERNAL_ERROR", "An unexpected error occurred", request));
    }

    private ErrorResponseDto error(String code, String message, HttpServletRequest request) {
        return ErrorResponseDto.builder()
                .code(code)
                .message(message)
                .correlationId(CorrelationIdFilter.getCorrelationId(request))
                .timestamp(OffsetDateTime.now())
                .build();
    }
}
