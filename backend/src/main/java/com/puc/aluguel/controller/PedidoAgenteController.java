package com.puc.aluguel.controller;

import com.puc.aluguel.dto.ParecerRequest;
import com.puc.aluguel.dto.PedidoResponse;
import com.puc.aluguel.model.StatusPedido;
import com.puc.aluguel.service.PedidoService;
import jakarta.validation.Valid;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

/** Avaliação de pedidos pelo agente (UC09, UC10, UC14). */
@RestController
@RequestMapping("/api/agente/pedidos")
@PreAuthorize("hasRole('AGENTE')")
public class PedidoAgenteController {

    private final PedidoService pedidoService;

    public PedidoAgenteController(PedidoService pedidoService) {
        this.pedidoService = pedidoService;
    }

    @GetMapping
    public List<PedidoResponse> listar(@RequestParam(required = false) StatusPedido status) {
        return pedidoService.listarParaAgente(status);
    }

    @GetMapping("/{id}")
    public PedidoResponse consultar(@PathVariable Long id) {
        return pedidoService.consultar(id);
    }

    @PostMapping("/{id}/analise")
    public PedidoResponse iniciarAnalise(@PathVariable Long id) {
        return pedidoService.iniciarAnalise(id);
    }

    @PostMapping("/{id}/parecer")
    public PedidoResponse registrarParecer(@PathVariable Long id, @Valid @RequestBody ParecerRequest req) {
        return pedidoService.registrarParecer(id, req);
    }

    @PostMapping("/{id}/execucao")
    public PedidoResponse executar(@PathVariable Long id) {
        return pedidoService.executar(id);
    }
}
