package com.puc.aluguel.exception;

import org.springframework.http.HttpStatus;

/** Violação de regra de negócio, com o status HTTP a ser devolvido. */
public class RegraNegocioException extends RuntimeException {

    private final HttpStatus status;

    public RegraNegocioException(HttpStatus status, String mensagem) {
        super(mensagem);
        this.status = status;
    }

    public HttpStatus getStatus() {
        return status;
    }
}
