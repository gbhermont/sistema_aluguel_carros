package com.puc.aluguel.dto;

import jakarta.validation.Valid;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

import java.util.List;

/** Cadastro público (US01 + US05): sempre cria um usuário com perfil CLIENTE. */
public record CadastroClienteRequest(
        @NotBlank(message = "Informe o nome.") String nome,
        @NotBlank(message = "Informe o usuário.") @Email(message = "Usuário deve ser um e-mail válido.") String login,
        @NotBlank(message = "Informe a senha.") @Size(min = 6, message = "A senha deve ter ao menos 6 caracteres.") String senha,
        @NotBlank(message = "Informe o RG.") @Size(max = 20, message = "RG inválido.") String rg,
        @NotBlank(message = "Informe o CPF.")
        @Pattern(regexp = "\\d{3}\\.?\\d{3}\\.?\\d{3}-?\\d{2}", message = "CPF deve ter o formato 000.000.000-00.") String cpf,
        @NotBlank(message = "Informe o endereço.") String endereco,
        @NotBlank(message = "Informe a profissão.") String profissao,
        @Size(max = 3, message = "Informe no máximo 3 rendimentos.") List<@Valid RendimentoRequest> rendimentos) {
}
