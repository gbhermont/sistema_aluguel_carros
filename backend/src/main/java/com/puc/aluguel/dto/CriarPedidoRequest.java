package com.puc.aluguel.dto;

import jakarta.validation.constraints.NotNull;

/** Criação de pedido (US09): referencia um automóvel disponível. */
public record CriarPedidoRequest(@NotNull(message = "Informe o automóvel.") Long automovelId) {
}
