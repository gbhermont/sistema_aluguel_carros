package com.puc.aluguel.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

public record LoginRequest(
        @NotBlank(message = "Informe o usuário.") @Email(message = "Usuário deve ser um e-mail válido.") String login,
        @NotBlank(message = "Informe a senha.") String senha) {
}
