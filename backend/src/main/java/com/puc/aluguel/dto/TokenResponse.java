package com.puc.aluguel.dto;

import java.time.Instant;

public record TokenResponse(String token, Instant expiraEm, UsuarioResponse usuario) {
}
