package com.puc.aluguel.controller;

import com.puc.aluguel.dto.CadastroClienteRequest;
import com.puc.aluguel.dto.LoginRequest;
import com.puc.aluguel.dto.TokenResponse;
import com.puc.aluguel.dto.UsuarioResponse;
import com.puc.aluguel.service.AuthService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

/**
 * Endpoints de autenticação (UC01, UC02). O logout (UC03) é stateless:
 * o front-end descarta o token, que expira automaticamente.
 */
@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/login")
    public TokenResponse login(@Valid @RequestBody LoginRequest req) {
        return authService.login(req);
    }

    @PostMapping("/cadastro")
    @ResponseStatus(HttpStatus.CREATED)
    public UsuarioResponse cadastrar(@Valid @RequestBody CadastroClienteRequest req) {
        return authService.cadastrarCliente(req);
    }

    @GetMapping("/me")
    public UsuarioResponse me(@AuthenticationPrincipal Jwt jwt) {
        return authService.buscarPorLogin(jwt.getSubject());
    }
}
