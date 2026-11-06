package com.puc.aluguel.dto;

import java.math.BigDecimal;

public record RendimentoResponse(Long id, String entidadeEmpregadora, BigDecimal valor) {
}
