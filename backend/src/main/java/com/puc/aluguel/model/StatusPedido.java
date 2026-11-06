package com.puc.aluguel.model;

import java.util.Set;

/** Ciclo de vida do pedido (docs/historias-de-usuario.md, US10). */
public enum StatusPedido {
    PENDENTE,
    EM_ANALISE,
    APROVADO,
    REPROVADO,
    CANCELADO,
    EXECUTADO;

    /** Status em que o pedido ainda está "ativo" (bloqueia remoção do cliente - US08). */
    public static final Set<StatusPedido> ATIVOS =
            Set.of(PENDENTE, EM_ANALISE, APROVADO);

    public boolean ativo() {
        return ATIVOS.contains(this);
    }

    /** Cliente só modifica pedido em PENDENTE ou EM_ANALISE (US11). */
    public boolean modificavelPeloCliente() {
        return this == PENDENTE || this == EM_ANALISE;
    }

    /** Cancelável enquanto não executado nem já cancelado (US12). */
    public boolean cancelavel() {
        return this != EXECUTADO && this != CANCELADO;
    }
}
