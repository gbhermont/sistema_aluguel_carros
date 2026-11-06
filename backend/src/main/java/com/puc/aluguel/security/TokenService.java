package com.puc.aluguel.security;

import com.puc.aluguel.model.Agente;
import com.puc.aluguel.model.Usuario;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.oauth2.jose.jws.MacAlgorithm;
import org.springframework.security.oauth2.jwt.JwsHeader;
import org.springframework.security.oauth2.jwt.JwtClaimsSet;
import org.springframework.security.oauth2.jwt.JwtEncoder;
import org.springframework.security.oauth2.jwt.JwtEncoderParameters;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.List;

/** Emite tokens JWT (HS256) com o perfil do usuário como "roles". */
@Service
public class TokenService {

    public static final String ISSUER = "aluguel-carros";

    private final JwtEncoder encoder;
    private final long expiracaoMinutos;

    public TokenService(JwtEncoder encoder, @Value("${app.jwt.expiracao-minutos}") long expiracaoMinutos) {
        this.encoder = encoder;
        this.expiracaoMinutos = expiracaoMinutos;
    }

    public record TokenEmitido(String valor, Instant expiraEm) {
    }

    public TokenEmitido gerar(Usuario usuario) {
        Instant agora = Instant.now();
        Instant expira = agora.plus(expiracaoMinutos, ChronoUnit.MINUTES);

        List<String> roles = new ArrayList<>();
        roles.add(usuario.getPerfil().name());
        if (usuario instanceof Agente a && a.isBanco()) {
            roles.add("BANCO");
        }

        JwtClaimsSet claims = JwtClaimsSet.builder()
                .issuer(ISSUER)
                .issuedAt(agora)
                .expiresAt(expira)
                .subject(usuario.getLogin())
                .claim("uid", usuario.getId())
                .claim("roles", roles)
                .build();

        JwsHeader header = JwsHeader.with(MacAlgorithm.HS256).build();
        String token = encoder.encode(JwtEncoderParameters.from(header, claims)).getTokenValue();
        return new TokenEmitido(token, expira);
    }
}
