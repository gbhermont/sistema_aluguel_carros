package com.puc.aluguel.dto;

import jakarta.validation.constraints.NotNull;

/** Modificação de pedido (US11): troca do automóvel. */
public record ModificarPedidoRequest(@NotNull(message = "Informe o automóvel.") Long automovelId) {
}
