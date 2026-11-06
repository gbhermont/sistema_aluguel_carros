package com.puc.aluguel.dto;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

import java.util.List;

/**
 * Atualização dos dados cadastrais (US07). Login, CPF e RG não são editáveis:
 * identificam o cliente e já foram validados no cadastro.
 */
public record AtualizarClienteRequest(
        @NotBlank(message = "Informe o nome.") String nome,
        @NotBlank(message = "Informe o endereço.") String endereco,
        @NotBlank(message = "Informe a profissão.") String profissao,
        @Size(max = 3, message = "Informe no máximo 3 rendimentos.") List<@Valid RendimentoRequest> rendimentos) {
}
