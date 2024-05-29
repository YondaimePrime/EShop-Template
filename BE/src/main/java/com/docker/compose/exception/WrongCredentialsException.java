package com.docker.compose.exception;

import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus
public class WrongCredentialsException extends RuntimeException {

    private static final long serialVersionUID = 2;

    public WrongCredentialsException(String message) {
        super(message);
    }
}
