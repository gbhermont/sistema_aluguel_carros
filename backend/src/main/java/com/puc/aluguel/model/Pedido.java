package com.puc.aluguel.model;

import com.puc.aluguel.exception.RegraNegocioException;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import org.springframework.http.HttpStatus;

import java.time.LocalDateTime;

/** Solicitação de aluguel feita por um cliente, com ciclo de status (US09-US14). */
@Entity
@Table(name = "pedido")
public class Pedido {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "cliente_id", nullable = false)
    private Cliente cliente;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "automovel_id", nullable = false)
    private Automovel automovel;

    @Column(name = "data_criacao", nullable = false)
    private LocalDateTime dataCriacao;

    @Column(name = "data_atualizacao", nullable = false)
    private LocalDateTime dataAtualizacao;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private StatusPedido status;

    @Column(length = 500)
    private String parecer;

    protected Pedido() {
    }

    public Pedido(Cliente cliente, Automovel automovel) {
        this.cliente = cliente;
        this.automovel = automovel;
        this.status = StatusPedido.PENDENTE;
        LocalDateTime agora = LocalDateTime.now();
        this.dataCriacao = agora;
        this.dataAtualizacao = agora;
    }

    public void trocarAutomovel(Automovel novo) {
        if (!status.modificavelPeloCliente()) {
            throw new RegraNegocioException(HttpStatus.CONFLICT,
                    "O pedido só pode ser modificado enquanto estiver Pendente ou Em análise.");
        }
        this.automovel = novo;
        tocar();
    }

    public void cancelar() {
        if (!status.cancelavel()) {
            throw new RegraNegocioException(HttpStatus.CONFLICT,
                    "Pedidos executados ou já cancelados não podem ser cancelados.");
        }
        this.status = StatusPedido.CANCELADO;
        tocar();
    }

    public void iniciarAnalise() {
        exigirStatus(StatusPedido.PENDENTE, "Só é possível analisar pedidos Pendentes.");
        this.status = StatusPedido.EM_ANALISE;
        tocar();
    }

    public void registrarParecer(boolean aprovado, String parecer) {
        exigirStatus(StatusPedido.EM_ANALISE, "Emita o parecer apenas durante a análise.");
        this.status = aprovado ? StatusPedido.APROVADO : StatusPedido.REPROVADO;
        this.parecer = parecer;
        tocar();
    }

    public void executar() {
        exigirStatus(StatusPedido.APROVADO, "Só pedidos Aprovados podem ser executados.");
        this.status = StatusPedido.EXECUTADO;
        tocar();
    }

    private void exigirStatus(StatusPedido esperado, String mensagem) {
        if (this.status != esperado) {
            throw new RegraNegocioException(HttpStatus.CONFLICT, mensagem);
        }
    }

    private void tocar() {
        this.dataAtualizacao = LocalDateTime.now();
    }

    public Long getId() { return id; }
    public Cliente getCliente() { return cliente; }
    public Automovel getAutomovel() { return automovel; }
    public LocalDateTime getDataCriacao() { return dataCriacao; }
    public LocalDateTime getDataAtualizacao() { return dataAtualizacao; }
    public StatusPedido getStatus() { return status; }
    public String getParecer() { return parecer; }
}
