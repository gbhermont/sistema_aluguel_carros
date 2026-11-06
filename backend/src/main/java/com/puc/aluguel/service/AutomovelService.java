package com.puc.aluguel.service;

import com.puc.aluguel.dto.AutomovelResponse;
import com.puc.aluguel.repository.AutomovelRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/** Listagem de automóveis disponíveis (UC13 / US17). */
@Service
public class AutomovelService {

    private final AutomovelRepository automovelRepository;

    public AutomovelService(AutomovelRepository automovelRepository) {
        this.automovelRepository = automovelRepository;
    }

    @Transactional(readOnly = true)
    public List<AutomovelResponse> listarDisponiveis() {
        return automovelRepository.findDisponiveis().stream().map(AutomovelResponse::de).toList();
    }
}
