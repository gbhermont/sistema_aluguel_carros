package com.puc.aluguel.dto;

import jakarta.validation.constraints.NotNull;

/** Parecer da análise financeira (US13). */
public record ParecerRequest(
        @NotNull(message = "Informe a decisão (aprovado=true/false).") Boolean aprovado,
        String parecer) {
}
