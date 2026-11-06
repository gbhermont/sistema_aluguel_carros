package com.puc.aluguel.controller;

import com.puc.aluguel.dto.AtualizarClienteRequest;
import com.puc.aluguel.dto.ClienteResponse;
import com.puc.aluguel.service.ClienteService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

/**
 * CRUD do próprio cadastro de cliente (UC04). Restrito ao perfil CLIENTE;
 * as operações usam o login do token, de modo que um cliente só vê a si mesmo.
 */
@RestController
@RequestMapping("/api/clientes")
@PreAuthorize("hasRole('CLIENTE')")
public class ClienteController {

    private final ClienteService clienteService;

    public ClienteController(ClienteService clienteService) {
        this.clienteService = clienteService;
    }

    @GetMapping("/me")
    public ClienteResponse consultar(@AuthenticationPrincipal Jwt jwt) {
        return clienteService.consultarPorLogin(jwt.getSubject());
    }

    @PutMapping("/me")
    public ClienteResponse atualizar(@AuthenticationPrincipal Jwt jwt,
                                     @Valid @RequestBody AtualizarClienteRequest req) {
        return clienteService.atualizar(jwt.getSubject(), req);
    }

    @DeleteMapping("/me")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void remover(@AuthenticationPrincipal Jwt jwt) {
        clienteService.remover(jwt.getSubject());
    }
}
