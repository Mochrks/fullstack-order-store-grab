package com.usecasegrab.fullstackgrab.exception;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;

import lombok.Getter;

public class MultipleException extends RuntimeException {

    @Getter
    private final List<Exception> exceptions;

    public MultipleException(Exception... exceptions) {
        super();
        this.exceptions = Collections.unmodifiableList(Arrays.asList(exceptions));
    }

    public MultipleException(String message, Exception... exceptions) {
        super(message);
        this.exceptions = Collections.unmodifiableList(Arrays.asList(exceptions));
    }

}
