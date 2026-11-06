package com.puc.aluguel.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

import java.math.BigDecimal;

/** Entidade empregadora e valor auferido pelo cliente. */
@Entity
@Table(name = "rendimento")
public class Rendimento {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "entidade_empregadora", nullable = false)
    private String entidadeEmpregadora;

    @Column(nullable = false, precision = 12, scale = 2)
    private BigDecimal valor;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "cliente_id", nullable = false)
    private Cliente cliente;

    protected Rendimento() {
    }

    public Rendimento(String entidadeEmpregadora, BigDecimal valor) {
        this.entidadeEmpregadora = entidadeEmpregadora;
        this.valor = valor;
    }

    public Long getId() { return id; }
    public String getEntidadeEmpregadora() { return entidadeEmpregadora; }
    public BigDecimal getValor() { return valor; }
    public Cliente getCliente() { return cliente; }
    void setCliente(Cliente cliente) { this.cliente = cliente; }
}
