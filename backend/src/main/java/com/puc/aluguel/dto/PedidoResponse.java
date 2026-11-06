package com.puc.aluguel.dto;

import com.puc.aluguel.model.Pedido;
import com.puc.aluguel.model.StatusPedido;

import java.time.LocalDateTime;

/** Pedido com dados do cliente e do automóvel para exibição na API. */
public record PedidoResponse(
        Long id,
        Long clienteId,
        String clienteNome,
        AutomovelResponse automovel,
        LocalDateTime dataCriacao,
        LocalDateTime dataAtualizacao,
        StatusPedido status,
        String parecer) {

    public static PedidoResponse de(Pedido p) {
        return new PedidoResponse(
                p.getId(),
                p.getCliente().getId(),
                p.getCliente().getNome(),
                AutomovelResponse.de(p.getAutomovel()),
                p.getDataCriacao(),
                p.getDataAtualizacao(),
                p.getStatus(),
                p.getParecer());
    }
}
