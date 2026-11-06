package com.puc.aluguel.dto;

import com.puc.aluguel.model.Automovel;

public record AutomovelResponse(Long id, String matricula, int ano, String marca, String modelo, String placa) {

    public static AutomovelResponse de(Automovel a) {
        return new AutomovelResponse(a.getId(), a.getMatricula(), a.getAno(), a.getMarca(), a.getModelo(), a.getPlaca());
    }
}
