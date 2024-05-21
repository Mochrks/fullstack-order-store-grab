package com.usecasegrab.fullstackgrab.exception;

import com.usecasegrab.fullstackgrab.dto.ErrorDTO;
import com.usecasegrab.fullstackgrab.exception.classes.*;
import lib.i18n.utility.MessageUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.lang.Exception;

@RestControllerAdvice
public class ExceptionHandling {

    @Autowired
    private MessageUtil messageUtil;

    @ExceptionHandler(Exception.class)
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    public ErrorDTO handleAllExceptions(Exception ex) {
        return new ErrorDTO(
                HttpStatus.INTERNAL_SERVER_ERROR.value(),
                messageUtil.get("application.error.internal"),
                ex.getMessage());
    }

    @ExceptionHandler(DataNotFoundException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public ErrorDTO handleNotFoundExceptions(DataNotFoundException ex) {
        return new ErrorDTO(
                HttpStatus.NOT_FOUND.value(),
                messageUtil.get("application.error.data-not-found"),
                ex.getMessage());
    }

    @ExceptionHandler(AlreadyDeletedException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ErrorDTO handleDeletedExceptions(AlreadyDeletedException ex) {
        return new ErrorDTO(
                HttpStatus.BAD_REQUEST.value(),
                messageUtil.get("application.error.data-already-deleted"),
                ex.getMessage());
    }

    @ExceptionHandler(DataAccessException.class)
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    public ErrorDTO handleDataAccessExceptions(DataAccessException ex) {
        return new ErrorDTO(
                HttpStatus.INTERNAL_SERVER_ERROR.value(),
                messageUtil.get("application.error.data-access"),
                ex.getMessage());
    }

    @ExceptionHandler(MinioUploadException.class)
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    public ErrorDTO handleMinioUploadException(MinioUploadException ex) {
        return new ErrorDTO(
                HttpStatus.INTERNAL_SERVER_ERROR.value(),
                messageUtil.get("application.error.upload.minio"),
                ex.getMessage());
    }

    @ExceptionHandler(UnauthorizedUserException.class)
    @ResponseStatus(HttpStatus.UNAUTHORIZED)
    public ErrorDTO handleUnauthorizedUserException(UnauthorizedUserException ex) {
        return new ErrorDTO(
                HttpStatus.UNAUTHORIZED.value(),
                messageUtil.get("application.error.unauthorized-user"),
                ex.getMessage());
    }

    @ExceptionHandler(UnknownAuthenticationException.class)
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    public ErrorDTO handleUnauthorizedUserException(UnknownAuthenticationException ex) {
        return new ErrorDTO(
                HttpStatus.INTERNAL_SERVER_ERROR.value(),
                messageUtil.get("application.error.unknown.principal.type"),
                ex.getMessage());
    }

}
