package com.harvesthub.exception;

import org.springframework.http.HttpStatus;

/** Throw this anywhere to return an error status with a readable message to the frontend. */
public class ApiException extends RuntimeException {

    private final HttpStatus status;

    public ApiException(HttpStatus status, String message) {
        super(message);
        this.status = status;
    }

    public HttpStatus getStatus() {
        return status;
    }
}
