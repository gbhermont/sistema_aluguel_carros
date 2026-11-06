package com.puc.aluguel.controller;

import com.puc.aluguel.dto.CriarPedidoRequest;
import com.puc.aluguel.dto.ModificarPedidoRequest;
import com.puc.aluguel.dto.PedidoResponse;
import com.puc.aluguel.service.PedidoService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

/** Pedidos do próprio cliente (UC05, UC06, UC07, UC08). */
@RestController
@RequestMapping("/api/cliente/pedidos")
@PreAuthorize("hasRole('CLIENTE')")
public class PedidoClienteController {

    private final PedidoService pedidoService;

    public PedidoClienteController(PedidoService pedidoService) {
        this.pedidoService = pedidoService;
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public PedidoResponse criar(@AuthenticationPrincipal Jwt jwt, @Valid @RequestBody CriarPedidoRequest req) {
        return pedidoService.criar(jwt.getSubject(), req);
    }

    @GetMapping
    public List<PedidoResponse> listar(@AuthenticationPrincipal Jwt jwt) {
        return pedidoService.listarDoCliente(jwt.getSubject());
    }

    @GetMapping("/{id}")
    public PedidoResponse consultar(@AuthenticationPrincipal Jwt jwt, @PathVariable Long id) {
        return pedidoService.consultarDoCliente(jwt.getSubject(), id);
    }

    @PutMapping("/{id}")
    public PedidoResponse modificar(@AuthenticationPrincipal Jwt jwt, @PathVariable Long id,
                                    @Valid @RequestBody ModificarPedidoRequest req) {
        return pedidoService.modificar(jwt.getSubject(), id, req);
    }

    @PostMapping("/{id}/cancelamento")
    public PedidoResponse cancelar(@AuthenticationPrincipal Jwt jwt, @PathVariable Long id) {
        return pedidoService.cancelar(jwt.getSubject(), id);
    }
}
