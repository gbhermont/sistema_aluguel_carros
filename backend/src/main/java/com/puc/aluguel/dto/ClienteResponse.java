package com.puc.aluguel.dto;

import com.puc.aluguel.model.Cliente;

import java.util.List;

/** Representação completa do cliente para a API (sem a senha). */
public record ClienteResponse(
        Long id,
        String nome,
        String login,
        String rg,
        String cpf,
        String endereco,
        String profissao,
        List<RendimentoResponse> rendimentos) {

    public static ClienteResponse de(Cliente c) {
        List<RendimentoResponse> rends = c.getRendimentos().stream()
                .map(r -> new RendimentoResponse(r.getId(), r.getEntidadeEmpregadora(), r.getValor()))
                .toList();
        return new ClienteResponse(c.getId(), c.getNome(), c.getLogin(), c.getRg(), c.getCpf(),
                c.getEndereco(), c.getProfissao(), rends);
    }
}
