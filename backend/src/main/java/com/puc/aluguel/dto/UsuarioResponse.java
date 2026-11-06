package com.puc.aluguel.dto;

import com.puc.aluguel.model.Agente;
import com.puc.aluguel.model.Perfil;
import com.puc.aluguel.model.TipoAgente;
import com.puc.aluguel.model.Usuario;

/** Dados públicos do usuário autenticado (nunca expõe o hash da senha). */
public record UsuarioResponse(Long id, String nome, String login, Perfil perfil, TipoAgente tipoAgente) {

    public static UsuarioResponse de(Usuario u) {
        TipoAgente tipo = (u instanceof Agente a) ? a.getTipo() : null;
        return new UsuarioResponse(u.getId(), u.getNome(), u.getLogin(), u.getPerfil(), tipo);
    }
}
