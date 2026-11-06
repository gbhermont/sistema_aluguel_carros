package com.puc.aluguel.controller;

import com.puc.aluguel.dto.AutomovelResponse;
import com.puc.aluguel.service.AutomovelService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

/** Automóveis disponíveis para aluguel (qualquer usuário autenticado). */
@RestController
@RequestMapping("/api/automoveis")
public class AutomovelController {

    private final AutomovelService automovelService;

    public AutomovelController(AutomovelService automovelService) {
        this.automovelService = automovelService;
    }

    @GetMapping("/disponiveis")
    public List<AutomovelResponse> disponiveis() {
        return automovelService.listarDisponiveis();
    }
}
