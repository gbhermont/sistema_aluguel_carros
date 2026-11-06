package com.puc.aluguel.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.Table;

/** Empresa ou banco que avalia, modifica e executa pedidos. Pré-cadastrado. */
@Entity
@Table(name = "agente")
public class Agente extends Usuario {

    @Column(name = "nome_fantasia", nullable = false)
    private String nomeFantasia;

    @Column(nullable = false, unique = true, length = 14)
    private String cnpj;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private TipoAgente tipo;

    protected Agente() {
    }

    public Agente(String nome, String login, String senhaHash,
                  String nomeFantasia, String cnpj, TipoAgente tipo) {
        super(nome, login, senhaHash, Perfil.AGENTE);
        this.nomeFantasia = nomeFantasia;
        this.cnpj = cnpj;
        this.tipo = tipo;
    }

    public boolean isBanco() {
        return tipo == TipoAgente.BANCO;
    }

    public String getNomeFantasia() { return nomeFantasia; }
    public String getCnpj() { return cnpj; }
    public TipoAgente getTipo() { return tipo; }
}
