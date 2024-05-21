package com.usecasegrab.fullstackgrab.config;

import lib.i18n.utility.MessageUtil;

import java.util.Collections;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.lang.Nullable;
import org.springframework.web.HttpRequestMethodNotSupportedException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@ControllerAdvice
@RequiredArgsConstructor(onConstructor = @__(@Autowired))
public class ResponseEntityExceptionConfig extends ResponseEntityExceptionHandler {

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    private static class ErrorInputParameters {
        private Exception exception;
        private Object body;
        private HttpHeaders headers;
        private HttpStatus status;
        private WebRequest request;

        protected ErrorInputParameters copy() {
            return ErrorInputParameters.builder()
                    .exception(this.exception)
                    .body(this.body)
                    .headers(this.headers)
                    .status(this.status)
                    .request(this.request)
                    .build();
        }
    }

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    private static class ErrorOutputParameters {
        private HttpStatus status;
        private HttpHeaders headers;
        private Object body;
    }

    @Data
    private static class ErrorDefinition {
        protected static final String PROP_PREFIX = "application.error.";
        protected static final String PROP_CODE = ".code";
        protected static final String PROP_TITLE = ".title";
        protected static final String PROP_DETAIL = ".detail";

        protected ErrorDefinition(MessageUtil msg, String errorType, Object... args) {
            this.code = msg.get(PROP_PREFIX + errorType + PROP_CODE);
            this.title = msg.get(PROP_PREFIX + errorType + PROP_TITLE);
            this.detail = msg.get(PROP_PREFIX + errorType + PROP_DETAIL, args);
        }

        private String code;
        private String title;
        private String detail;
    }

    private static String getStatusString(HttpStatus status) {
        return status.series().name() + ":" + status.value() + ":" + status.name();
    }

    // ---

    private final MessageUtil msg;

    // ---

}
