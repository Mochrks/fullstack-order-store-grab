package com.usecasegrab.fullstackgrab.exception.classes;

public class Exception extends RuntimeException {
    /**
     * 
     */
    private static final long serialVersionUID = -5986005101762809022L;

    public Exception(String message) {
        super(message);
    }

    public Exception(String message, Throwable cause) {
        super(message, cause);
    }
}
