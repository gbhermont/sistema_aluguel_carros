package com.puc.aluguel.exception;

import org.springframework.http.HttpStatus;

/** Recurso inexistente (404). */
public class RecursoNaoEncontradoException extends RegraNegocioException {

    public RecursoNaoEncontradoException(String mensagem) {
        super(HttpStatus.NOT_FOUND, mensagem);
    }
}
